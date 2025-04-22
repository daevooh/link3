from django.contrib import admin
from django.utils.html import format_html
from .models import BlockchainNetwork, ProjectToken, TokenTransaction, TokenRedemption, UserWallet, TokenCreationRequest

@admin.register(BlockchainNetwork)
class BlockchainNetworkAdmin(admin.ModelAdmin):
    list_display = ('name', 'chain_id', 'is_testnet', 'is_active', 'view_explorer')
    list_filter = ('is_testnet', 'is_active')
    search_fields = ('name', 'chain_id')
    actions = ['enable_networks', 'disable_networks']
    
    fieldsets = (
        ('Network Information', {
            'fields': ('name', 'chain_id', 'is_testnet')
        }),
        ('Connection Details', {
            'fields': ('rpc_endpoint', 'explorer_url')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )
    
    def view_explorer(self, obj):
        if obj.explorer_url:
            return format_html('<a href="{}" target="_blank">Explorer</a>', obj.explorer_url)
        return '-'
    view_explorer.short_description = 'Explorer'
    
    def enable_networks(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} networks have been enabled.')
    enable_networks.short_description = "Enable selected networks"
    
    def disable_networks(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} networks have been disabled.')
    disable_networks.short_description = "Disable selected networks"

@admin.register(ProjectToken)
class ProjectTokenAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol', 'project', 'network', 'is_deployed', 'display_contract_address', 'created_at')
    list_filter = ('is_deployed', 'network', 'created_at')
    search_fields = ('name', 'symbol', 'contract_address', 'project__name')
    readonly_fields = ('contract_address', 'creation_tx_hash', 'is_deployed', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Token Information', {
            'fields': ('project', 'name', 'symbol', 'decimals', 'total_supply')
        }),
        ('Network Information', {
            'fields': ('network', 'admin_address')
        }),
        ('Deployment Status', {
            'fields': ('is_deployed', 'contract_address', 'creation_tx_hash', 'created_at', 'updated_at')
        }),
    )
    
    def display_contract_address(self, obj):
        if obj.contract_address:
            if obj.network.explorer_url:
                return format_html('<a href="{}/account/{}" target="_blank">{:.10}...</a>', 
                                  obj.network.explorer_url, obj.contract_address, obj.contract_address)
            return f"{obj.contract_address[:10]}..."
        return '-'
    display_contract_address.short_description = 'Contract'

@admin.register(TokenTransaction)
class TokenTransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'transaction_type', 'amount', 'status', 'display_tx_hash', 'created_at')
    list_filter = ('status', 'transaction_type', 'created_at')
    search_fields = ('user__external_id', 'wallet_address', 'tx_hash')
    readonly_fields = ('tx_hash', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Transaction Information', {
            'fields': ('user', 'project_token', 'transaction_type', 'amount', 'status')
        }),
        ('Blockchain Details', {
            'fields': ('wallet_address', 'tx_hash')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def display_tx_hash(self, obj):
        if obj.tx_hash:
            if obj.project_token and obj.project_token.network.explorer_url:
                return format_html('<a href="{}/txs/{}" target="_blank">{:.10}...</a>', 
                                  obj.project_token.network.explorer_url, obj.tx_hash, obj.tx_hash)
            return f"{obj.tx_hash[:10]}..."
        return '-'
    display_tx_hash.short_description = 'TX Hash'

@admin.register(TokenRedemption)
class TokenRedemptionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'amount', 'status', 'display_tx_hash', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__external_id', 'wallet_address', 'transaction_hash')
    readonly_fields = ('transaction_hash', 'created_at', 'processed_at')
    
    fieldsets = (
        ('Redemption Information', {
            'fields': ('user', 'amount', 'status', 'error_message')
        }),
        ('Blockchain Details', {
            'fields': ('wallet_address', 'transaction_hash')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'processed_at')
        }),
    )
    
    def display_tx_hash(self, obj):
        if obj.transaction_hash:
            # Try to determine the network from the user's project
            network = None
            if obj.user and obj.user.project:
                token = ProjectToken.objects.filter(project=obj.user.project).first()
                if token:
                    network = token.network
            
            if network and network.explorer_url:
                return format_html('<a href="{}/txs/{}" target="_blank">{:.10}...</a>', 
                                  network.explorer_url, obj.transaction_hash, obj.transaction_hash)
            return f"{obj.transaction_hash[:10]}..."
        return '-'
    display_tx_hash.short_description = 'TX Hash'

@admin.register(UserWallet)
class UserWalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'address_display', 'network', 'is_verified', 'created_at')
    list_filter = ('is_verified', 'network', 'created_at')
    search_fields = ('user__external_id', 'address')
    
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Wallet Details', {
            'fields': ('address', 'network', 'is_verified')
        }),
        ('Verification', {
            'fields': ('verification_message', 'verification_signature')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    
    def address_display(self, obj):
        if obj.network.explorer_url:
            return format_html('<a href="{}/account/{}" target="_blank">{:.10}...{}</a>', 
                             obj.network.explorer_url, obj.address, obj.address[:10], obj.address[-6:])
        return f"{obj.address[:10]}...{obj.address[-6:]}"
    address_display.short_description = 'Address'

@admin.register(TokenCreationRequest)
class TokenCreationRequestAdmin(admin.ModelAdmin):
    list_display = ('symbol', 'name', 'project', 'network', 'status', 'submitted_at', 'approved_by', 'rejected_by')
    list_filter = ('status', 'network', 'submitted_at')
    search_fields = ('symbol', 'name', 'project__name')
    readonly_fields = ('id', 'submitted_at', 'updated_at', 'approved_at', 'rejected_at', 'deployed_token')
    fieldsets = (
        ('Token Details', {
            'fields': ('project', 'name', 'symbol', 'total_supply', 'network', 'admin_address', 'decimals')
        }),
        ('Status Information', {
            'fields': ('status', 'submitted_at', 'updated_at')
        }),
        ('Review Information', {
            'fields': ('approved_by', 'approved_at', 'rejected_by', 'rejected_at', 'review_notes', 'deployed_token')
        }),
    )
    
    actions = ['approve_requests', 'reject_requests']
    
    def approve_requests(self, request, queryset):
        from .services import TokenService
        
        admin_user = request.user.appuser
        count = 0
        for token_request in queryset.filter(status='pending'):
            result = TokenService.approve_token_request(token_request.id, admin_user)
            if result['success']:
                count += 1
        
        self.message_user(request, f"Successfully approved {count} token requests.")
    approve_requests.short_description = "Approve selected requests"
    
    def reject_requests(self, request, queryset):
        from .services import TokenService
        
        admin_user = request.user.appuser
        count = 0
        for token_request in queryset.filter(status='pending'):
            result = TokenService.reject_token_request(token_request.id, admin_user)
            if result['success']:
                count += 1
        
        self.message_user(request, f"Successfully rejected {count} token requests.")
    reject_requests.short_description = "Reject selected requests"