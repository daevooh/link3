from django.db import models
import uuid
from django.utils import timezone
from users.models import AppUser, Project
from decimal import Decimal
import logging
from django.utils.translation import gettext_lazy as _
from django.conf import settings

logger = logging.getLogger(__name__)

class TokenRedemption(models.Model):
    """
    Represents a token redemption from off-chain to on-chain
    """
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='redemptions')
    amount = models.DecimalField(max_digits=36, decimal_places=18)
    wallet_address = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_hash = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    processed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True, null=True)
    # Add reference to token transaction for tracking
    transaction_id = models.CharField(max_length=255, blank=True, null=True, help_text="ID of the associated TokenTransaction")
    
    def __str__(self):
        return f"{self.user} - {self.amount} tokens - {self.status}"
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
        
    def mark_processing(self):
        """Mark redemption as processing"""
        self.status = 'processing'
        self.save(update_fields=['status'])
    
    def mark_completed(self, transaction_hash):
        """Mark redemption as completed with transaction hash"""
        self.status = 'completed'
        self.transaction_hash = transaction_hash
        self.processed_at = timezone.now()
        self.save(update_fields=['status', 'transaction_hash', 'processed_at'])
    
    def mark_failed(self, error_message):
        """Mark redemption as failed with error message"""
        self.status = 'failed'
        self.error_message = error_message
        self.processed_at = timezone.now()
        self.save(update_fields=['status', 'error_message', 'processed_at'])

class BlockchainNetwork(models.Model):
    """Supported blockchain networks"""
    name = models.CharField(max_length=50)  # e.g., "Sei", "Ethereum"
    chain_id = models.CharField(max_length=50)  # e.g., "sei-testnet-2", "1" for Ethereum
    rpc_endpoint = models.URLField()
    explorer_url = models.URLField(null=True, blank=True)
    is_testnet = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({'Testnet' if self.is_testnet else 'Mainnet'})"
        
    class Meta:
        indexes = [
            models.Index(fields=['chain_id']),
            models.Index(fields=['is_active']),
        ]

class ProjectToken(models.Model):
    """Token representation for a project"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tokens')
    name = models.CharField(max_length=100)  # e.g., "Link3 Demo Token"
    symbol = models.CharField(max_length=10)  # e.g., "LDT"
    network = models.ForeignKey(BlockchainNetwork, on_delete=models.PROTECT, related_name='tokens')
    contract_address = models.CharField(max_length=100, null=True, blank=True)
    decimals = models.IntegerField(default=18)
    total_supply = models.DecimalField(max_digits=36, decimal_places=18, default=Decimal('0'))
    is_deployed = models.BooleanField(default=False)
    admin_address = models.CharField(max_length=100)  # Project owner's wallet address
    creation_tx_hash = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['project', 'network', 'symbol']
        indexes = [
            models.Index(fields=['project']),
            models.Index(fields=['is_deployed']),
            models.Index(fields=['contract_address']),
        ]

    def __str__(self):
        return f"{self.symbol} ({self.project.name})"

class UserWallet(models.Model):
    """User blockchain wallet addresses"""
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='wallets')
    address = models.CharField(max_length=100)
    network = models.ForeignKey(BlockchainNetwork, on_delete=models.PROTECT, related_name='wallets')
    is_verified = models.BooleanField(default=False)
    verification_message = models.CharField(max_length=255, null=True, blank=True)
    verification_signature = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'address', 'network']
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['address']),
            models.Index(fields=['is_verified']),
        ]

    def __str__(self):
        return f"{self.address[:10]}...{self.address[-6:]} ({self.user.external_id})"

class TokenTransaction(models.Model):
    """Records of token transactions between off-chain and on-chain"""
    TRANSACTION_TYPES = [
        ('MINT', 'Mint'),
        ('REDEMPTION', 'Redemption'),
        ('TRANSFER', 'Transfer'),
    ]
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('CONFIRMED', 'Confirmed'),
        ('FAILED', 'Failed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='token_transactions')
    project_token = models.ForeignKey(ProjectToken, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=36, decimal_places=18)
    wallet_address = models.CharField(max_length=100)
    tx_hash = models.CharField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['project_token']),
            models.Index(fields=['status']),
            models.Index(fields=['transaction_type']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return f"{self.transaction_type}: {self.amount} {self.project_token.symbol} for {self.user.external_id}"

    def mark_processing(self):
        """Mark transaction as processing"""
        self.status = 'PROCESSING'
        self.save(update_fields=['status', 'updated_at'])
    
    def mark_confirmed(self, tx_hash):
        """Mark transaction as confirmed with transaction hash"""
        self.status = 'CONFIRMED'
        self.tx_hash = tx_hash
        self.save(update_fields=['status', 'tx_hash', 'updated_at'])
    
    def mark_failed(self, error_message=None):
        """Mark transaction as failed"""
        self.status = 'FAILED'
        self.save(update_fields=['status', 'updated_at'])

class TokenCreationRequest(models.Model):
    """
    Model for token creation requests that require admin approval
    """
    STATUS_CHOICES = [
        ('pending', _('Pending Approval')),
        ('approved', _('Approved')),
        ('rejected', _('Rejected')),
        ('deployed', _('Deployed')),
        ('canceled', _('Canceled'))
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey('users.Project', on_delete=models.CASCADE, related_name='token_requests')
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    total_supply = models.DecimalField(max_digits=78, decimal_places=0)
    network = models.ForeignKey('blockchain.BlockchainNetwork', on_delete=models.CASCADE, related_name='token_requests')
    admin_address = models.CharField(max_length=255)
    decimals = models.PositiveIntegerField(default=18)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Approval details
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_tokens')
    approved_at = models.DateTimeField(null=True, blank=True)
    rejected_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='rejected_tokens')
    rejected_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(null=True, blank=True)
    
    # Link to deployed token (if approved and deployed)
    deployed_token = models.OneToOneField('blockchain.ProjectToken', on_delete=models.SET_NULL, null=True, blank=True, related_name='creation_request')
    
    class Meta:
        verbose_name = _("Token Creation Request")
        verbose_name_plural = _("Token Creation Requests")
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.symbol} - {self.get_status_display()}"
    
    def approve(self, reviewer, notes=None):
        """Approve the token request"""
        if self.status != 'pending':
            raise ValueError(f"Cannot approve request with status {self.get_status_display()}")
            
        self.status = 'approved'
        self.approved_by = reviewer
        self.approved_at = timezone.now()
        if notes:
            self.review_notes = notes
        self.save(update_fields=['status', 'approved_by', 'approved_at', 'review_notes', 'updated_at'])
        logger.info(f"Token request {self.symbol} approved by {reviewer}")
        return True
        
    def reject(self, reviewer, notes=None):
        """Reject the token request"""
        if self.status != 'pending':
            raise ValueError(f"Cannot reject request with status {self.get_status_display()}")
            
        self.status = 'rejected'
        self.rejected_by = reviewer
        self.rejected_at = timezone.now()
        if notes:
            self.review_notes = notes
        self.save(update_fields=['status', 'rejected_by', 'rejected_at', 'review_notes', 'updated_at'])
        logger.info(f"Token request {self.symbol} rejected by {reviewer}")
        return True
        
    def cancel(self):
        """Cancel the token request"""
        if self.status not in ['pending', 'approved']:
            raise ValueError(f"Cannot cancel request with status {self.get_status_display()}")
            
        self.status = 'canceled'
        self.save(update_fields=['status', 'updated_at'])
        logger.info(f"Token request {self.symbol} canceled")
        return True
