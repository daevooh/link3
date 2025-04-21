from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from . import views
from .views_blockchain import (
    NetworkListView,
    NetworkDetailView,
    TokenView,
    TokenDetailView,
    TokenRedemptionView,
    TokenDeploymentView,
    WalletBalanceView,
    UserWalletView,
    network_health_check
)
from .views_tokenization import (
    TokenizationRuleViewSet,
    ActionTypeListView,
    TokenizationStatsView
)

# Create API documentation schema view
schema_view = get_schema_view(
   openapi.Info(
      title="Link3 API",
      default_version='v1.0',
      description="API for Link3 platform - blockchain integration and tokenization",
      terms_of_service="/terms/",
      contact=openapi.Contact(email="dev@example.com"),
      license=openapi.License(name="Proprietary License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

# Set up the router for ViewSets
router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet, basename='project')

# Set up nested routes
projects_router = DefaultRouter()
projects_router.register(r'rules', views.TokenizationRuleViewSet, basename='project-rules')

# Create a router for tokenization rules
tokenization_router = DefaultRouter()
tokenization_router.register(r'rules', TokenizationRuleViewSet, basename='tokenization-rules')

urlpatterns = [
    # API documentation
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='api-docs'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='api-redoc'),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # ViewSet routes
    path('', include(router.urls)),
    path('projects/<uuid:project_pk>/', include(projects_router.urls)),
    
    # Regular endpoints
    path('test/', views.ApiTestView.as_view(), name='api-test'),
    path('interaction/', views.InteractionAPIView.as_view(), name='interaction'),
    
    # User balance endpoints
    path('users/<str:external_id>/balance/', views.UserBalanceView.as_view(), name='user-balance'),
    path('balance/<str:hash_key>/', views.BalanceAPIView.as_view(), name='balance'),
    path('balance/', views.BalanceAPIView.as_view(), name='balance-post'),  # New simpler endpoint
    
    # Token redemption endpoints
    path('redeem/', views.TokenRedemptionView.as_view(), name='token-redemption'),
    path('redeem-by-hash/', views.TokenRedemptionByHashView.as_view(), name='redeem-by-hash'),
    
    # User interaction history endpoints
    path('users/<str:external_id>/interactions/', views.UserInteractionsView.as_view(), name='user-interactions'),
    path('interactions/<str:hash_key>/', views.UserInteractionsByHashView.as_view(), name='interactions-by-hash'),
    
    # Project stats
    path('projects/<uuid:project_id>/stats/', views.project_stats, name='project-stats'),

    # Blockchain network management endpoints
    path('networks/', NetworkListView.as_view(), name='networks'),
    path('networks/<uuid:network_id>/', NetworkDetailView.as_view(), name='network-detail'),
    path('networks/<uuid:network_id>/health/', network_health_check, name='network-health'),
    
    # Other blockchain endpoints
    path('tokens/', TokenView.as_view(), name='tokens'),
    path('tokens/<uuid:token_id>/deploy/', TokenDeploymentView.as_view(), name='token-deploy'),
    path('wallets/', UserWalletView.as_view(), name='wallets'),
    path('redeem-blockchain/', TokenRedemptionView.as_view(), name='redeem-blockchain'),
    path('token-balance/', WalletBalanceView.as_view(), name='token-balance'),

    # Tokenization API endpoints
    path('tokenization/', include(tokenization_router.urls)),
    path('tokenization/action-types/', ActionTypeListView.as_view(), name='action-types'),
    path('tokenization/stats/', TokenizationStatsView.as_view(), name='tokenization-stats'),
]