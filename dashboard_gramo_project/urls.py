from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/', include('api.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('', include('frontend.urls')),
]

urlpatterns += [
    path('settings/', include('frontend.urls')),
    path('ordercompleted/', include('frontend.urls')),
    path('orders/', include('frontend.urls')),
    path('withdraw/', include('frontend.urls')),
    path('deposit/', include('frontend.urls')),
    path('claim/', include('frontend.urls')),
    path('use/', include('frontend.urls')),
    path('login/', include('frontend.urls')),
    path('signup/', include('frontend.urls')),
    path('reset_password/', include('frontend.urls')),
    path('password/reset/confirm/<str:uid>/<str:token>/', include('frontend.urls')),
    path('activate/<str:uid>/<str:token>/', include('frontend.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)