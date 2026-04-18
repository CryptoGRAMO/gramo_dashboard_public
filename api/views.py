import uuid
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status
from algosdk import account, mnemonic, encoding, constants
from django.conf import settings
from api.models import Wallets, Settings
from algosdk.v2client import algod
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn, PaymentTxn
import json
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.hashers import check_password
from django.core.files.storage import FileSystemStorage
from django.core.mail import EmailMultiAlternatives
from api.config_testnet import *


def main(request):
    return HttpResponse("hello")

# generate account if it is the first time or return balance # -----------------------------------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def manageWallet(request):
    algod_address = api_testnet_url
    algod_token = token_testnet
    _sender = functioning_address
    _sk = functioning_sk
    
    headers = {
        "X-API-Key": algod_token,
    }

    # User doesn't have account ->
    if not Wallets.objects.filter(pk=request.user.id).exists():
        print('......have not account')
        # model Wallet
        wallet = Wallets()
        # generate account, store data in variable _account
        _account = generateAccount()

        if(_account):
            # save wallet in db
            saveWallet(wallet,_account,request)

            # initialize conn 
            algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)

            # show balance
            getBalanceMicroAlgos(algod_client,_account)

            # TRANSFER 0.25 ALGOs
            transferAlg(algod_client,_sender,_account,_sk)

            # show balance
            getBalanceMicroAlgos(algod_client,_account)

            # OPT-IN
            optIn(algod_client,_account["wallet"],_account["sk"])

            # get balance
            balance = {
                "gramo": getBalanceGramo(algod_client,_account),
                "algos": getBalanceMicroAlgos(algod_client,_account)
            }
    
    # User have account ->
    else: 
        print('......have account')

        _wallet = Wallets.objects.get(pk=request.user.id)
        _account = {
            "wallet": _wallet.wallet,
            "sk": _wallet.sk,
            "passphrase": _wallet.mnemonic
        }

        algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)
        
        # get balance
        balance = {
                "gramo": getBalanceGramo(algod_client,_account),
                "algos": getBalanceMicroAlgos(algod_client,_account)
            }

    return Response(data={"_account": _account["wallet"], "balance": balance},status=status.HTTP_200_OK)

def generateAccount():
    sk, wallet = account.generate_account()

    if encoding.is_valid_address(wallet):
        print("The address is valid!")
        return {
            "wallet": wallet,
            "sk": sk,
            "passphrase": mnemonic.from_private_key(sk)
        }
    else:
        print("The address is invalid.")
        return None

def wait_for_confirmation(client, txid):
    """
    Utility function to wait until the transaction is
    confirmed before proceeding.
    """
    last_round = client.status().get('last-round')
    txinfo = client.pending_transaction_info(txid)
    while not (txinfo.get('confirmed-round') and txinfo.get('confirmed-round') > 0):
        print("Waiting for confirmation")
        last_round += 1
        client.status_after_block(last_round)
        txinfo = client.pending_transaction_info(txid)
    print("Transaction {} confirmed in round {}.".format(txid, txinfo.get('confirmed-round')))
    # print()
    return txinfo

def saveWallet(wallet,_account,request):
    wallet.user_id = request.user.id
    wallet.wallet = _account["wallet"]
    wallet.sk = _account["sk"]
    wallet.mnemonic = _account["passphrase"]
    # save account data asociated to current user
    wallet.save()

def getBalanceMicroAlgos(algod_client,_account):
    # get accountInfo
    account_info = algod_client.account_info(_account["wallet"])
    print("wallet balance: {} microalgos".format(account_info.get('amount')))
    return account_info

def transferAlg(algod_client,_sender,_account,_sk):
    # TRANSFER 0.25 ALGOs
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    params.fee = 0.001
    params.flat_fee = False

    # transaction
    txn = PaymentTxn(
        sender=_sender, #config
        sp=params,
        receiver=_account["wallet"],
        amt=250000,
        note='Dashboard test'
        )
    stxn = txn.sign(_sk) #config
    txid = algod_client.send_transaction(stxn)
    print(txid)
    wait_for_confirmation(algod_client, txid)

def getBalanceGramo(algod_client,_account):
    return print_asset_holding(algod_client, _account['wallet'], gramo_id)

def optIn(algod_client, wallet, sk):        
    # Check if gramo_id is in account 1's asset holdings prior
    # to opt-in
    params = algod_client.suggested_params()
    # comment these two lines if you want to use suggested params
    params.fee = 0.001
    params.flat_fee = False

    account_info = algod_client.account_info(wallet)
    holding = None
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1    
        """config data
        """
        if (scrutinized_asset['asset-id'] == gramo_id):
            holding = True
            break

    if not holding:

        # Use the AssetTransferTxn class to transfer assets and opt-in
        txn = AssetTransferTxn(
            sender=wallet,
            sp=params,
            receiver=wallet,
            amt=0,
            index=gramo_id)
        stxn = txn.sign(sk)
        txid = algod_client.send_transaction(stxn)
        print(txid)
        # Wait for the transaction to be confirmed
        wait_for_confirmation(algod_client, txid)
        # Now check the asset holding for that account.
        # This should now show a holding with a balance of 0.
        # print_asset_holding(algod_client, wallet, gramo_id)

#   Utility function used to print asset holding for account and assetid
def print_asset_holding(algodclient, account, assetid):
    # note: if you have an indexer instance available it is easier to just use this
    # response = myindexer.accounts(asset_id = assetid)
    # then loop thru the accounts returned and match the account you are looking for
    account_info = algodclient.account_info(account)
    idx = 0
    gramo = {}
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1        
        if (scrutinized_asset['asset-id'] == assetid):
            print("Asset ID: {}".format(scrutinized_asset['asset-id']))
            print(json.dumps(scrutinized_asset, indent=4))
            gramo = scrutinized_asset
            break
    return gramo

# withdraw # ---------------------------------------------------------------------------------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdraw(request):
    # Conn data
    algod_address = api_testnet_url
    algod_token = token_testnet
    headers = {
        "X-API-Key": algod_token,
    }
    # external to send
    address_to_send = request.data["address"]
    amount_to_send = request.data["amount"]
    #sender
    sender_wallet_model = Wallets.objects.get(pk=request.user.id)
    sender_wallet = sender_wallet_model.wallet
    sender_sk = sender_wallet_model.sk
    gramo_txn = float(amount_to_send)*100
    
    # conn
    algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)

    # check if the address is valid
    if encoding.is_valid_address(address_to_send):
        print("The address is valid!")
        # TRANSFER GRAMOs
        # transfer asset from user account to external account
        params = algod_client.suggested_params()
        # comment these two lines if you want to use suggested params
        #params.fee = 0.001
        #params.flat_fee = False

        txn = AssetTransferTxn(
            sender=sender_wallet, # wallet user
            sp=params,
            receiver=address_to_send,
            amt=int(gramo_txn),
            index=gramo_id)
        stxn = txn.sign(sender_sk)
        txid = algod_client.send_transaction(stxn)
        print(txid)
        # Wait for the transaction to be confirmed
        wait_for_confirmation(algod_client, txid)
        # Show balance
        print_asset_holding(algod_client, sender_wallet, gramo_id)

    else:
        return Response(data={"wrong": "incorrect address!"},status=status.HTTP_404_NOT_FOUND)
    

    return Response(data={"TRANSACTION": "SUCCESS"},status=status.HTTP_200_OK)

# buying ( Use) # ----------------------------------------------------------------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def receive(request):
    mywallet = functioning_address
    # Conn data
    algod_address = api_testnet_url
    algod_token = token_testnet
    headers = {
        "X-API-Key": algod_token,
    }
    # send to me
    address_to_send = mywallet
    amount_to_send = request.data["amount"]
    #sender
    sender_wallet_model = Wallets.objects.get(pk=request.user.id)
    sender_wallet = sender_wallet_model.wallet
    sender_sk = sender_wallet_model.sk
    gramo_txn = float(amount_to_send)*100
    
    # conn
    algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)

    # check if the address is valid
    if encoding.is_valid_address(address_to_send):
        print("The address is valid!")
        # TRANSFER GRAMOs
        # transfer asset from user account to external account
        params = algod_client.suggested_params()
        # comment these two lines if you want to use suggested params
        #params.fee = 0.001
        #params.flat_fee = False

        try:
            txn = AssetTransferTxn(
            sender=sender_wallet, # wallet user
            sp=params,
            receiver=address_to_send,
            amt=int(gramo_txn),
            index=gramo_id)
            stxn = txn.sign(sender_sk)
            txid = algod_client.send_transaction(stxn)
            print(txid)
            # Wait for the transaction to be confirmed
            wait_for_confirmation(algod_client, txid)
            # Show balance
            print_asset_holding(algod_client, sender_wallet, gramo_id)
        except:
            return Response(data={"wrong": "something when wrong, check if you have enough gramo"},status=status.HTTP_400_BAD_REQUEST)


    else:
        return Response(data={"wrong": "incorrect address!"},status=status.HTTP_404_NOT_FOUND)
    

    return Response(data={"TRANSACTION": "SUCCESS"},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkPassword(request):

    print('password correct?')

        # if not self._password:
        #     return False
        # crypted_thing = sha(request.data['passwordCheck']).hexdigest() 

        # sha
    user = authenticate(request, email= request.data['email'], password= request.data['passwordCheck'])

    if user is not None:
        authent = True
    else:
        authent = False

    return Response(data={"passwordcorrect?": authent},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_profiledata(request):

    user = get_user_model().objects.get(pk=request.data['userid'])
    user.email = request.data['email']
    user.name = request.data['name']

    if(request.data['password'] != ""):
        user.set_password(request.data['password'])

    if(request.FILES != {}):
        upload = request.FILES['image']
        name = str(uuid.uuid1())+upload.name
        fss = FileSystemStorage(settings.MEDIA_ROOT+'/gallery/avatars')
        file = fss.save(name, upload)
        user.avatar = name

    user.save()

    return Response(data={"ok?": "ok"},status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def claim(request):

    wallet = Wallets.objects.get(user_id= request.user.id)

    if(request.FILES != {}):
        upload = request.FILES['image']
        name = str(uuid.uuid1())+upload.name
        fss = FileSystemStorage(settings.MEDIA_ROOT+'/gallery/invoices')
        file = fss.save(name, upload)
        wallet.invoiceImg = name

    wallet.save()
    
    invoice = request.data['domain']+"/media/gallery/invoices/"+wallet.invoiceImg 
    amount = request.data["amount"]
    company = request.data["company"]
    date = request.data["date"]

    subjectAdmin, from_emailAdmin, toAdmin = 'Message from a user with the following email: ' + request.user.email, settings.EMAIL_HOST_USER, settings.EMAIL_HOST_USER
    text_contentAdmin = 'Message from a user with the following email: '+request.user.email
    html_contentAdmin = '<div>'+ '<p>'+ '<strong> Date:</strong>' + date  + '</p>' + '<p>'+ '<strong> Amount:</strong>' + amount + '</p>' + '<p>'+ '<strong> Company:</strong>' + company  + '</p>' + '<p>'+ '<strong> Invoice Image:</strong> <br>' + '<img src="'+ invoice +'">'  + '</p>' + '</div>'
    msgAdmin = EmailMultiAlternatives(subjectAdmin, text_contentAdmin, from_emailAdmin, [toAdmin])
    msgAdmin.attach_alternative(html_contentAdmin, "text/html")
    msgAdmin.send()

    print(html_contentAdmin)

    return Response(data={"ok?": "ok"},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def viewEnv(request):
    envVariables = {
        "CONSUMER_KEY" : settings.CONSUMER_KEY,
        "CONSUMER_SECRET": settings.CONSUMER_SECRET
    }

    return Response(data=envVariables,status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def checkingEmail(request):
    user = get_user_model()
    existEmail = user.objects.filter(email=request.data['email']).exists()

    return Response(data={"existEmail": existEmail},status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def getSettings(request):
    settings = {
        'maintenance': Settings.objects.filter(name='maintenance')[0].featureStatus
    }

    return Response(data=settings,status=status.HTTP_200_OK)
