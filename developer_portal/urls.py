from django.urls import path, re_path
from . import views

app_name = 'developer_portal'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('verification/', views.verification, name='verification'),
    path('documentation/', views.documentation, name='documentation'),
    path('api-keys/', views.api_keys, name='api_keys'),
    path('api-keys/delete/', views.delete_api_key, name='delete_api_key'),
    path('projects/create/', views.create_project, name='create_project'),
    path('analytics/', views.analytics, name='analytics'),
    path('settings/', views.settings, name='settings'),
    path('token-settings/', views.token_settings, name='token_settings'),
    path('tokenization-rules/', views.tokenization_rules, name='tokenization_rules'),
    path('tokens/request/', views.create_token_request, name='create_token_request'),
    path('tokens/requests/', views.token_requests, name='token_requests'),
    # Update path to handle both UUID and integer formats for backward compatibility
    re_path(r'tokens/request/(?P<request_id>[\w-]+)/', views.view_token_request, name='view_token_request'),
    path('tokens/request/<uuid:request_id>/edit/', views.edit_token_request, name='edit_token_request'),
    path('tokens/request/<uuid:request_id>/cancel/', views.cancel_token_request, name='cancel_token_request'),
    path('tokens/documentation/', views.token_documentation, name='token_documentation'),
]