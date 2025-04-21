from django.contrib import admin
from .models import TokenizationRule, Interaction

@admin.register(TokenizationRule)
class TokenizationRuleAdmin(admin.ModelAdmin):
    list_display = ('project', 'action_type', 'custom_action_name', 'base_amount', 'is_active')
    list_filter = ('project', 'action_type', 'is_active', 'one_time')
    search_fields = ('project__name', 'action_type', 'custom_action_name', 'description')
    fieldsets = (
        ('Rule Information', {
            'fields': ('project', 'action_type', 'custom_action_name', 'description', 'is_active')
        }),
        ('Token Rewards', {
            'fields': ('base_amount', 'multiplier', 'min_duration_seconds')
        }),
        ('Rule Behavior', {
            'fields': ('one_time', 'cooldown_hours', 'cooldown_minutes')
        }),
    )


@admin.register(Interaction)
class InteractionAdmin(admin.ModelAdmin):
    # Change 'created_at' to 'timestamp' to match your model
    list_display = ('user', 'action_type', 'tokens_earned', 'timestamp')
    list_filter = ('action_type', 'timestamp')
    search_fields = ('user__external_id', 'action_type', 'metadata')
    readonly_fields = ('id', 'timestamp')
    fieldsets = (
        ('Interaction Information', {
            'fields': ('id', 'user', 'action_type', 'tokens_earned')
        }),
        ('Details', {
            'fields': ('metadata', 'timestamp')  # Fixed syntax and added timestamp
        }),
    )
