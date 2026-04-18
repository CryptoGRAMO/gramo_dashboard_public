from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from api.models import *

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
    fields = ('id', 'email', 'name', 'password', 'wallets', 'avatar','costumer_id',)
        

class WalletsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallets
        fields = (
            'user', 
            'mnemonic', 
            'sk', 
            'wallet', 
        )

