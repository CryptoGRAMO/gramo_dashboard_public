import json
import base64
from algosdk.v2client import algod
from algosdk import account, mnemonic, encoding, constants
from algosdk.future import transaction
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn, PaymentTxn
from config import *


##### DASHBOARD 1.0 by Txou Investments May 2022 #####
# This script will be launched once someone registers in the system and makes a username/password
# The script automatically generates an Algorand account,
# transfers 0.25 ALGOs from functioning account
# and makes the opt-in to GRAMO ASA :)

sk, wallet = account.generate_account()
print("wallet: {}".format(wallet))
print()
print("sk signature_key: {}".format(sk))
print()
print("passphrase: {}".format(mnemonic.from_private_key(sk)))
print()
_mnemonic = mnemonic.from_private_key(sk)

# check if the address is valid
if encoding.is_valid_address(wallet):
    print("The address is valid!")
else:
    print("The address is invalid.")

#test mode (comment next 3 lines if NOT test)
# wallet = 'your-test-wallet-address-here'
# sk = 'your-test-private-key-here'
# mnemonic = 'your twenty five word mnemonic phrase here'


# Initialize an algod client
algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers) #config data

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
    return txinfo

#   Utility function used to print asset holding for account and assetid
def print_asset_holding(algodclient, account, assetid):
    # note: if you have an indexer instance available it is easier to just use this
    # response = myindexer.accounts(asset_id = assetid)
    # then loop thru the accounts returned and match the account you are looking for
    account_info = algodclient.account_info(account)
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1
        if (scrutinized_asset['asset-id'] == assetid):
            print("Asset ID: {}".format(scrutinized_asset['asset-id']))
            print(json.dumps(scrutinized_asset, indent=4))
            break

# show balance
wallet_info = algod_client.account_info(wallet)
print("wallet balance: {} microalgos".format(wallet_info.get('amount')))

# TRANSFER 0.25 ALGOs
params = algod_client.suggested_params()
# comment these two lines if you want to use suggested params
params.fee = 0.001
params.flat_fee = False

txn = PaymentTxn(
    sender=functioning_address, #config
    sp=params,
    receiver=wallet,
    amt=250000,
    note='Dashboard test'
    )
stxn = txn.sign(functioning_sk) #config
txid = algod_client.send_transaction(stxn)
print(txid)
wait_for_confirmation(algod_client, txid)

# show balance
wallet_info = algod_client.account_info(wallet)
print("wallet balance: {} microalgos".format(wallet_info.get('amount')))

# OPT-IN
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
    print_asset_holding(algod_client, wallet, gramo_id)
