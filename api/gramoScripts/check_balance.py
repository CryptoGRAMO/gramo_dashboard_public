from algosdk.v2client import algod
from algosdk import account, mnemonic
from algosdk.future.transaction import AssetConfigTxn, AssetTransferTxn, AssetFreezeTxn
from config import *
import json

##### DASHBOARD 1.0 by Txou Investments May 2022 #####
# This script shows GRAMO balance of user account

#test mode (comment next 3 lines if NOT test)
# wallet = 'your-test-wallet-address-here'
# sk = 'your-test-private-key-here'
# mnemonic = 'your twenty five word mnemonic phrase here'

# Initialize an algod client
algod_client = algod.AlgodClient(algod_token=algod_token, algod_address=algod_address, headers=headers)

account_info = algod_client.account_info(wallet)
print(json.dumps(account_info, indent=4))
print()
print("BALANCE")

def print_asset_holding(algodclient, wallet, asset_id):
    idx = 0
    for my_account_info in account_info['assets']:
        scrutinized_asset = account_info['assets'][idx]
        idx = idx + 1
        if (scrutinized_asset['asset-id'] == asset_id):
            print("Wallet: {}".format(wallet))
            print("GRAMO ASA ID: {}".format(scrutinized_asset['asset-id']))
            GRAMO_balance=scrutinized_asset['amount']/100
            print("Amount of GRAMOs: {}".format(GRAMO_balance))
            break

"""Need asset_id
"""

print_asset_holding(algod_client, wallet, asset_id)
