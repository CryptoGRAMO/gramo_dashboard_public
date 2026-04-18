from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('product/<str:id>/', index),
    path('checkout/<str:id>/', index),
]
