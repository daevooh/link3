from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.utils import timezone
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db.models import Sum
import json

from .models import (
    TokenRedemption, 
    BlockchainNetwork, 
    ProjectToken, 
    UserWallet, 
    TokenTransaction,
    TokenCreationRequest
)
from users.models import Project
from .connector import verify_wallet_signature
from decimal import Decimal

# Number of items per page for pagination
ITEMS_PER_PAGE = 10

@login_required
def dashboard(request):
    """
    Blockchain dashboard showing token balances, wallets, and recent transactions
    """
    user = request.user
    
    # Get user's wallets
    wallets = UserWallet.objects.filter(user=user).select_related('network')
    
    # Get projects where user is owner or member
    projects = Project.objects.filter(owner=user) | Project.objects.filter(team_members=user)
    projects = projects.distinct()
    
    # Get project tokens
    project_tokens = ProjectToken.objects.filter(project__in=projects, is_deployed=True).select_related('network', 'project')
    
    # Get recent transactions
    transactions = TokenTransaction.objects.filter(user=user).order_by('-created_at')[:5]
    
    # Get pending redemptions
    pending_redemptions = TokenRedemption.objects.filter(
        user=user, 
        status__in=['pending', 'processing']
    ).order_by('-created_at')
    
    context = {
        'wallets': wallets,
        'project_tokens': project_tokens,
        'transactions': transactions,
        'pending_redemptions': pending_redemptions,
    }
    
    return render(request, 'blockchain/dashboard.html', context)

@login_required
def token_list(request):
    """
    List all tokens associated with user's projects
    """
    user = request.user
    
    # Get projects where user is owner or member
    projects = Project.objects.filter(owner=user) | Project.objects.filter(team_members=user)
    projects = projects.distinct()
    
    # Get all tokens for these projects
    tokens = ProjectToken.objects.filter(project__in=projects).select_related('network', 'project')
    
    # Pagination
    page_number = request.GET.get('page', 1)
    paginator = Paginator(tokens, ITEMS_PER_PAGE)
    tokens_page = paginator.get_page(page_number)
    
    context = {
        'tokens': tokens_page,
    }
    
    return render(request, 'blockchain/token_list.html', context)

@login_required
def token_detail(request, token_id):
    """
    Detailed view for a specific token
    """
    user = request.user
    token = get_object_or_404(ProjectToken, id=token_id)
    
    # Security: Check if user is project owner or team member
    if not (token.project.owner == user or user in token.project.team_members.all()):
        messages.error(request, "You do not have permission to view this token.")
        return redirect('blockchain:token_list')
    
    # Get recent transactions for this token
    transactions = TokenTransaction.objects.filter(project_token=token).order_by('-created_at')[:10]
    
    context = {
        'token': token,
        'transactions': transactions,
    }
    
    return render(request, 'blockchain/token_detail.html', context)

@login_required
def wallet_management(request):
    """
    Manage user's blockchain wallets
    """
    user = request.user
    wallets = UserWallet.objects.filter(user=user).select_related('network')
    networks = BlockchainNetwork.objects.filter(is_active=True)
    
    if request.method == 'POST':
        network_id = request.POST.get('network')
        wallet_address = request.POST.get('wallet_address')
        
        if not (network_id and wallet_address):
            messages.error(request, "Both network and wallet address are required")
            return redirect('blockchain:wallet_management')
            
        network = get_object_or_404(BlockchainNetwork, id=network_id)
        
        # Check if wallet already exists for this user and network
        if UserWallet.objects.filter(user=user, network=network, address=wallet_address).exists():
            messages.warning(request, "This wallet is already registered for you on this network")
        else:
            # Create new wallet
            UserWallet.objects.create(
                user=user,
                network=network,
                address=wallet_address
            )
            messages.success(request, f"Wallet added successfully for {network.name}")
        
        return redirect('blockchain:wallet_management')
    
    context = {
        'wallets': wallets,
        'networks': networks,
    }
    
    return render(request, 'blockchain/wallet_management.html', context)

@login_required
@require_POST
def verify_wallet(request, wallet_id):
    """
    Verify ownership of a wallet using signature
    """
    wallet = get_object_or_404(UserWallet, id=wallet_id, user=request.user)
    
    try:
        data = json.loads(request.body)
        signature = data.get('signature')
        
        if not signature:
            return JsonResponse({'success': False, 'error': 'Signature is required'}, status=400)
        
        # Verify the signature using the connector
        verification_message = f"Link3: Verify wallet {wallet.address} for user {request.user.username}"
        is_valid = verify_wallet_signature(
            wallet.network.chain_id, 
            wallet.address,
            verification_message,
            signature
        )
        
        if is_valid:
            wallet.is_verified = True
            wallet.verification_message = verification_message
            wallet.verification_signature = signature
            wallet.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid signature'}, status=400)
            
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=400)

@login_required
def redemption_list(request):
    """
    List all token redemptions for the current user
    """
    user = request.user
    redemptions = TokenRedemption.objects.filter(user=user).order_by('-created_at')
    
    # Pagination
    page_number = request.GET.get('page', 1)
    paginator = Paginator(redemptions, ITEMS_PER_PAGE)
    redemptions_page = paginator.get_page(page_number)
    
    context = {
        'redemptions': redemptions_page,
    }
    
    return render(request, 'blockchain/redemption_list.html', context)

@login_required
def transaction_list(request):
    """
    List all token transactions for the current user
    """
    user = request.user
    transactions = TokenTransaction.objects.filter(user=user).order_by('-created_at')
    
    # Filter by type if specified
    transaction_type = request.GET.get('type')
    if transaction_type and transaction_type in [choice[0] for choice in TokenTransaction.TRANSACTION_TYPES]:
        transactions = transactions.filter(transaction_type=transaction_type)
    
    # Filter by status if specified
    status = request.GET.get('status')
    if status and status in [choice[0] for choice in TokenTransaction.STATUS_CHOICES]:
        transactions = transactions.filter(status=status)
    
    # Filter by project token if specified
    token_id = request.GET.get('token')
    if token_id:
        transactions = transactions.filter(project_token_id=token_id)
    
    # Pagination
    page_number = request.GET.get('page', 1)
    paginator = Paginator(transactions, ITEMS_PER_PAGE)
    transactions_page = paginator.get_page(page_number)
    
    # Get all project tokens for filter dropdown
    projects = Project.objects.filter(owner=user) | Project.objects.filter(team_members=user)
    projects = projects.distinct()
    project_tokens = ProjectToken.objects.filter(project__in=projects, is_deployed=True)
    
    context = {
        'transactions': transactions_page,
        'project_tokens': project_tokens,
        'transaction_types': TokenTransaction.TRANSACTION_TYPES,
        'status_choices': TokenTransaction.STATUS_CHOICES,
        'selected_type': transaction_type,
        'selected_status': status,
        'selected_token': token_id,
    }
    
    return render(request, 'blockchain/transaction_list.html', context)

@login_required
def create_token_request(request):
    """
    Create new token request
    """
    user = request.user
    
    # Get active networks
    networks = BlockchainNetwork.objects.filter(is_active=True)
    
    # Get projects owned by user
    projects = Project.objects.filter(owner=user)
    
    if request.method == 'POST':
        project_id = request.POST.get('project')
        name = request.POST.get('name')
        symbol = request.POST.get('symbol')
        total_supply = request.POST.get('total_supply')
        network_id = request.POST.get('network')
        admin_address = request.POST.get('admin_address')
        decimals = request.POST.get('decimals', 18)
        
        # Validate required fields
        if not all([project_id, name, symbol, total_supply, network_id, admin_address]):
            messages.error(request, "All fields are required")
            return redirect('blockchain:create_token_request')
        
        try:
            # Convert to appropriate types
            project = Project.objects.get(id=project_id, owner=user)
            network = BlockchainNetwork.objects.get(id=network_id, is_active=True)
            total_supply = Decimal(total_supply)
            decimals = int(decimals)
            
            # Check if token symbol is unique for this project and network
            if ProjectToken.objects.filter(project=project, network=network, symbol=symbol).exists():
                messages.error(request, f"Token with symbol {symbol} already exists for this project on {network.name}")
                return redirect('blockchain:create_token_request')
            
            # Create token request
            TokenCreationRequest.objects.create(
                project=project,
                name=name,
                symbol=symbol,
                total_supply=total_supply * (10 ** decimals),  # Convert to atomic units
                network=network,
                admin_address=admin_address,
                decimals=decimals
            )
            
            messages.success(request, "Token creation request submitted successfully")
            return redirect('blockchain:token_request_list')
            
        except Project.DoesNotExist:
            messages.error(request, "Invalid project")
        except BlockchainNetwork.DoesNotExist:
            messages.error(request, "Invalid network")
        except ValueError:
            messages.error(request, "Invalid numeric values")
        except Exception as e:
            messages.error(request, f"Error creating token request: {str(e)}")
        
        return redirect('blockchain:create_token_request')
    
    context = {
        'networks': networks,
        'projects': projects,
        'user_wallets': UserWallet.objects.filter(user=user, is_verified=True),
    }
    
    return render(request, 'blockchain/create_token_request.html', context)

@login_required
def token_request_list(request):
    """
    List all token requests for current user's projects
    """
    user = request.user
    
    # Get projects owned by user
    projects = Project.objects.filter(owner=user)
    
    # Get token requests for these projects
    token_requests = TokenCreationRequest.objects.filter(project__in=projects).order_by('-submitted_at')
    
    # Filter by status if specified
    status = request.GET.get('status')
    if status and status in [choice[0] for choice in TokenCreationRequest.STATUS_CHOICES]:
        token_requests = token_requests.filter(status=status)
    
    # Pagination
    page_number = request.GET.get('page', 1)
    paginator = Paginator(token_requests, ITEMS_PER_PAGE)
    token_requests_page = paginator.get_page(page_number)
    
    context = {
        'token_requests': token_requests_page,
        'status_choices': TokenCreationRequest.STATUS_CHOICES,
        'selected_status': status,
    }
    
    return render(request, 'blockchain/token_request_list.html', context)

@login_required
def create_redemption(request):
    """
    Create a new token redemption request to transfer tokens from off-chain to on-chain
    """
    user = request.user
    app_user = user.app_user if hasattr(user, 'app_user') else None
    
    if not app_user:
        messages.error(request, "AppUser profile not found")
        return redirect('blockchain:dashboard')
    
    # Get verified wallets
    wallets = UserWallet.objects.filter(user=app_user, is_verified=True).select_related('network')
    
    # Get user's off-chain token balance
    off_chain_balance = app_user.token_balance
    
    if request.method == 'POST':
        amount = request.POST.get('amount')
        wallet_id = request.POST.get('wallet')
        
        if not (amount and wallet_id):
            messages.error(request, "Both amount and wallet are required")
            return redirect('blockchain:create_redemption')
            
        try:
            amount = Decimal(amount)
            
            # Validate amount (positive and has appropriate precision)
            if amount <= 0:
                raise ValueError("Amount must be positive")
                
            if amount > off_chain_balance:
                messages.error(request, f"Insufficient balance. You have {off_chain_balance} tokens available.")
                return redirect('blockchain:create_redemption')
            
            wallet = UserWallet.objects.get(id=wallet_id, user=app_user, is_verified=True)
            
            # Start database transaction to ensure atomicity
            with transaction.atomic():
                # 1. Deduct from off-chain balance
                app_user.token_balance -= amount
                app_user.save(update_fields=['token_balance'])
                
                # 2. Create redemption record
                redemption = TokenRedemption.objects.create(
                    user=app_user,
                    amount=amount,
                    wallet_address=wallet.address,
                    status='pending'
                )
                
                # 3. Create token transaction record
                project = Project.objects.filter(developer=user).first()
                if project:
                    # Find the token associated with the project and network
                    project_token = ProjectToken.objects.filter(
                        project=project, 
                        network=wallet.network,
                        is_deployed=True
                    ).first()
                    
                    if project_token:
                        TokenTransaction.objects.create(
                            user=app_user,
                            project_token=project_token,
                            transaction_type='REDEMPTION',
                            amount=amount,
                            wallet_address=wallet.address,
                            status='PENDING'
                        )
            
            messages.success(request, f"Redemption request for {amount} tokens created successfully. The tokens will be sent to your wallet {wallet.address} shortly.")
            return redirect('blockchain:redemption_list')
            
        except UserWallet.DoesNotExist:
            messages.error(request, "Invalid wallet selection")
        except ValueError as e:
            messages.error(request, f"Invalid amount: {str(e)}")
        except Exception as e:
            messages.error(request, f"Error creating redemption: {str(e)}")
    
    context = {
        'wallets': wallets,
        'off_chain_balance': off_chain_balance,
    }
    
    return render(request, 'blockchain/create_redemption.html', context)
