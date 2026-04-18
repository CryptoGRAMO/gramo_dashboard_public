from algosdk.v2client import algod
from algosdk import account, mnemonic, encoding
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn
from config import *
import json

##### DASHBOARD 1.0 by Txou Investments May 2022 #####
# This script sends GRAMOs to an external account

#test mode (comment next 3 lines if NOT test)
# wallet = 'your-test-wallet-address-here'
# sk = 'your-test-private-key-here'
# mnemonic = 'your twenty five word mnemonic phrase here'

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

# introduce external wallet address
ext_wallet = input("Please introduce public address of the Algorand account where you want to send your GRAMOs: ")

# Initialize an algod client
algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)

# check if the address is valid
if encoding.is_valid_address(ext_wallet):
    print("The address is valid!")
else:
    print("The address is invalid.")
print()
# introduce GRAMOs to withdraw
gramo_amount = input("Please introduce how many GRAMOs you want to withdraw to your external Algorand wallet: ")
gramo_txn = float(gramo_amount)*100
# TRANSFER GRAMOs
# transfer asset from user account to external account
params = algod_client.suggested_params()
# comment these two lines if you want to use suggested params
#params.fee = 0.001
#params.flat_fee = False

txn = AssetTransferTxn(
    sender=wallet, # wallet user
    sp=params,
    receiver=ext_wallet,
    amt=int(gramo_txn),
    index=asset_id)
stxn = txn.sign(sk)
txid = algod_client.send_transaction(stxn)
print(txid)
# Wait for the transaction to be confirmed
wait_for_confirmation(algod_client, txid)
# Show balance
print_asset_holding(algod_client, wallet, asset_id)
