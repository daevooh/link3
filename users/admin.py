from django.contrib import admin
from .models import Project, AppUser, HashKeyRotation

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'api_key', 'is_active', 'token_name', 'blockchain_network', 'created_at')
    search_fields = ('name', 'api_key')
    list_filter = ('is_active', 'blockchain_network', 'created_at')
    readonly_fields = ('id', 'created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'name', 'description', 'website', 'is_active')
        }),
        ('API Configuration', {
            'fields': ('api_key',)
        }),
        ('Token Configuration', {
            'fields': ('token_name', 'token_symbol', 'token_supply', 'token_contract_address')
        }),
        ('Blockchain Configuration', {
            'fields': ('blockchain_network', 'owner_wallet_address')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Make API key field required when creating a new project
        if 'api_key' in form.base_fields:
            form.base_fields['api_key'].required = True
        return form


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'project', 'external_id', 'token_balance', 'last_seen')
    list_filter = ('project', 'created_at', 'last_seen')
    search_fields = ('external_id', 'current_hash_key', 'wallet_address')
    readonly_fields = ('id', 'created_at', 'last_seen')
    fieldsets = (
        ('User Information', {
            'fields': ('id', 'project', 'external_id', 'wallet_address')
        }),
        ('Hash Key and Tokens', {
            'fields': ('current_hash_key', 'token_balance')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'last_seen')
        }),
    )


@admin.register(HashKeyRotation)
class HashKeyRotationAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_active', 'created_at', 'expires_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('user__external_id', 'previous_hash_key')
    readonly_fields = ('id', 'created_at')
    fieldsets = (
        ('Hash Key Information', {
            'fields': ('id', 'user', 'previous_hash_key', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'expires_at')
        }),
    )
    actions = ['expire_selected_hash_keys']
    
    def expire_selected_hash_keys(self, request, queryset):
        """Admin action to expire selected hash keys"""
        for rotation in queryset:
            rotation.expire()
        self.message_user(request, f"Successfully expired {queryset.count()} hash keys.")
    expire_selected_hash_keys.short_description = "Expire selected hash keys"