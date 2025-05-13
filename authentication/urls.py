"""
URL patterns for authentication app.
"""
from django.urls import path
from . import views

app_name = 'authentication'

urlpatterns = [
    path('reown/callback/', views.reown_auth_callback, name='reown_callback'),
]
