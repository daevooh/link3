from django.contrib import admin
from .models import APIKey

@admin.register(APIKey)
class APIKeyAdmin(admin.ModelAdmin):
    list_display = ('name', 'prefix', 'project', 'scope', 'created_at', 'last_used', 'is_active')
    list_filter = ('scope', 'is_active', 'created_at')
    search_fields = ('name', 'prefix', 'project__name')
    readonly_fields = ('key', 'prefix', 'created_at', 'last_used')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'project', 'scope', 'is_active')
        }),
        ('Key Information', {
            'fields': ('prefix', 'created_at', 'last_used'),
            'classes': ('collapse',),
        }),
    )
    
    def has_change_permission(self, request, obj=None):
        # Don't allow changing the key after creation
        if obj and request.method == 'POST':
            return False
        return True
