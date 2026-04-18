from django.urls import path
from .views import *

urlpatterns = [
    path('', main),
    path('wallets', manageWallet),
    path('withdraw', withdraw),
    path('buy', receive),
    path('check_password', checkPassword),
    path('change_profiledata', change_profiledata),
    path('claim', claim),
    path('envVariable', viewEnv),
    path('checkemail', checkingEmail),
    path('settings', getSettings),
]