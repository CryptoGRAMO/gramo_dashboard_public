from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth import get_user_model


class UserAccountManager(BaseUserManager):
    def create_user(self, email, name, password:None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        user = self.model(email= email, name= name)

        user.set_password(password)
        user.save()

        return user 

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    avatar = models.CharField(max_length = 300, null=True)
    costumer_id = models.IntegerField(null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['name', 'avatar']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email

class Wallets(models.Model):
    #one to one: USER
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        primary_key=True    
    )

    wallet = models.CharField(max_length = 300, null=True)
    sk = models.CharField(max_length = 300, null=True)
    mnemonic = models.CharField(max_length = 300, null=True)
    invoiceImg = models.CharField(max_length = 300, null=True)

    def __str__(self):
        return "Wallets"
    
class Settings(models.Model):
    name = models.CharField(max_length = 300, null=True)
    featureStatus = models.BooleanField(default=True)

    def __str__(self):
        return "settings"

