import logging
from decimal import Decimal
from django.utils import timezone
from django.db import transaction
from django.core.cache import cache
from users.models import Project, AppUser
from tokenization.models import TokenizationRule, Interaction
from users.hash_service import HashKeyService

logger = logging.getLogger('django')

class TokenizationEngine:
    """
    Core service for handling token rewards for user interactions
    """
    
    def __init__(self, project):
        self.project = project
        
    def process_interaction(self, action_type, user, metadata=None):
        """
        Process a user interaction and apply token rewards
        
        Args:
            action_type: Type of action
            user: AppUser object
            metadata: Additional data about the interaction
            
        Returns:
            dict: Result with tokens earned
        """
        try:
            logger.info(f"Processing {action_type} for user: {user.external_id}")
            
            # Get applicable tokenization rule
            rule = self._get_rule(action_type)
            
            if not rule:
                return {
                    'success': True,
                    'tokens_earned': 0,
                    'message': f"No tokenization rule for {action_type}"
                }
            
            # Calculate tokens to award
            tokens = self._calculate_tokens(rule, metadata)
            
            # Update user's balance
            user.token_balance += tokens
            user.last_seen = timezone.now()
            user.save()
            
            # Record the interaction
            Interaction.objects.create(
                user=user,
                action_type=action_type,
                tokens_earned=tokens,
                metadata=metadata or {}
            )
            
            return {
                'success': True,
                'tokens_earned': tokens,
                'token_balance': user.token_balance,
                'message': f"Successfully processed {action_type}"
            }
            
        except Exception as e:
            logger.error(f"Error in process_interaction: {str(e)}")
            return {
                'success': False,
                'tokens_earned': 0,
                'message': f"Error processing interaction: {str(e)}"
            }
    
    def _calculate_tokens(self, rule, metadata=None):
        """
        Calculate tokens to award based on rule and metadata
        
        Args:
            rule: TokenizationRule object
            metadata: Additional interaction data
            
        Returns:
            Decimal: Token amount to award
        """
        try:
            from decimal import Decimal
            
            # Base amount from rule
            tokens = rule.base_amount
            
            # Apply multiplier if applicable
            if rule.multiplier is not None and rule.multiplier > 0:
                # Check for duration in video watch
                if rule.action_type == 'video_watch' and rule.min_duration_seconds:
                    if metadata and 'duration_seconds' in metadata:
                        duration = int(metadata.get('duration_seconds', 0))
                        
                        # Only apply multiplier if minimum duration is met
                        if duration >= rule.min_duration_seconds:
                            # Calculate multiplier based on duration
                            duration_multiplier = duration / rule.min_duration_seconds
                            tokens = tokens * Decimal(min(duration_multiplier, rule.multiplier))
                        else:
                            # Duration too short, no tokens
                            return Decimal('0')
                else:
                    # Apply flat multiplier for other action types
                    tokens = tokens * Decimal(rule.multiplier)
            
            return tokens
        except Exception as e:
            logger.error(f"Error calculating tokens: {str(e)}")
            return Decimal('0')

    def _calculate_reward(self, rule, metadata):
        """
        Calculate token reward based on rule and metadata
        """
        # Base reward
        reward = rule.base_amount
        
        # Apply modifiers based on metadata and rule type
        if rule.action_type == 'purchase' and rule.multiplier:
            purchase_amount = metadata.get('purchase_amount', 0)
            try:
                purchase_amount = Decimal(str(purchase_amount))
                reward += purchase_amount * Decimal(str(rule.multiplier))
            except (ValueError, TypeError):
                pass
        
        # Handle video watch duration check
        if rule.action_type == 'video_watch' and rule.min_duration_seconds:
            duration = metadata.get('duration_seconds', 0)
            try:
                duration = int(duration)
                if duration < rule.min_duration_seconds:
                    return Decimal('0')  # No reward if video not watched for minimum time
            except (ValueError, TypeError):
                return Decimal('0')
                
        return reward

    def _get_rule(self, action_type):
        """
        Get the tokenization rule for a specific action type
        
        Args:
            action_type: Type of action (e.g., 'login', 'like', etc.)
            
        Returns:
            TokenizationRule or None
        """
        try:
            # First try exact match
            rule = TokenizationRule.objects.filter(
                project=self.project,
                action_type=action_type,
                is_active=True
            ).first()
            
            # If no rule found and action_type is custom, try custom_action_name
            if not rule and action_type not in dict(TokenizationRule.ACTION_TYPES):
                rule = TokenizationRule.objects.filter(
                    project=self.project,
                    action_type='custom',
                    custom_action_name=action_type,
                    is_active=True
                ).first()
                
            return rule
        except Exception as e:
            logger.error(f"Error finding rule for {action_type}: {str(e)}")
            return None