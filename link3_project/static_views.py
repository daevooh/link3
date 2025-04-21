from django.shortcuts import render, redirect
from django.urls import path
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def home_view(request):
    return render(request, 'home.html')

def terms_view(request):
    return render(request, 'terms.html')

def contact_view(request):
    return render(request, 'contact.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, "Login successful.")
            return redirect('developer_portal:dashboard')
        else:
            messages.error(request, "Invalid username or password.")
    
    return render(request, 'login.html')

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password2 = request.POST.get('password2')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        
        # Basic validation
        if password != password2:
            messages.error(request, "Passwords do not match.")
            return render(request, 'signup.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return render(request, 'signup.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return render(request, 'signup.html')
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        # Log user in
        login(request, user)
        messages.success(request, "Account created successfully!")
        return redirect('developer_portal:dashboard')
    
    return render(request, 'signup.html')

def logout_view(request):
    logout(request)
    messages.success(request, "Logged out successfully.")
    return redirect('home')

urlpatterns = [
    path('', terms_view, name='terms'),
    path('contact/', contact_view, name='contact'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('logout/', logout_view, name='logout'),
]