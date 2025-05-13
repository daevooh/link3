"""
URL configuration for link3_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .static_views import home_view, login_view, signup_view, logout_view

# API information for OpenAPI schema
api_info = openapi.Info(
    title="Link3 API",
    default_version='v1',
    description="API for Link3 blockchain tokenization platform",
    terms_of_service="http://localhost:8000/terms/",
    contact=openapi.Contact(email="contact@link3.io", url="http://localhost:8000/contact/"),
    license=openapi.License(name="Proprietary"),
)

# Schema view for API documentation
schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # Home page
    path('', home_view, name='home'),
    
    # Authentication
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
    path('auth/', include('authentication.urls', namespace='authentication')),
    
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/', include('api.urls')),
    
    # Developer Portal
    path('developer/', include('developer_portal.urls')),
    
    # API Documentation - Keep original paths for backward compatibility
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger.yaml/', schema_view.without_ui(cache_timeout=0), name='schema-yaml'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # Add new paths expected by the test
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='test-swagger-ui'),
    path('docs/<format>/', schema_view.without_ui(cache_timeout=0), name='test-schema-json'),
    
    # Static pages
    path('terms/', include('link3_project.static_views')),
    path('contact/', include('link3_project.static_views')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
