from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Profile, SiteVisit
import json


def get_user_profile(user):
    profile, created = Profile.objects.get_or_create(user=user)
    return profile


def login(request):
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()

        if not username or not password:
            messages.error(request, "Both fields are required.")
            return render(request, 'login.html')

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            get_user_profile(user)   # ensure profile exists
            return redirect("/")
        else:
            messages.error(request, "Invalid username or password.")
            return render(request, 'login.html')

    return render(request, 'login.html')


def register(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        username = request.POST.get('username', '').strip()
        email = request.POST.get('email', '').strip()
        password1 = request.POST.get('password1', '')
        password2 = request.POST.get('password2', '')

        if not all([first_name, last_name, username, email, password1, password2]):
            messages.error(request, "All fields are required.")
            return render(request, 'login.html', {'show_register': True})

        if password1 != password2:
            messages.error(request, "Passwords do not match.")
            return render(request, 'login.html', {'show_register': True})

        if User.objects.filter(username=username).exists():
            messages.error(request, "Username is already taken.")
            return render(request, 'login.html', {'show_register': True})

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email is already registered.")
            return render(request, 'login.html', {'show_register': True})

        user = User.objects.create_user(
            username=username,
            password=password1,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.save()

        get_user_profile(user)

        messages.success(request, "Registration successful! Please log in.")
        return redirect('login')

    return render(request, 'login.html', {'show_register': True})


def logout(request):
    auth.logout(request)
    return redirect('/')


def leaderboard(request):
    users = Profile.objects.select_related("user").extra(
        select={'score': 'visits + (plays * 5)'}
    ).order_by('-score')
    return render(request, 'leaderboard.html', {'users': users})


@csrf_exempt
def add_visit(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        print("DEBUG: User not authenticated")
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)
    
    try:
        data = json.loads(request.body) if request.body else {}
        game = data.get("game")
        print(f"DEBUG: add_visit called for game={game}")
        # Get or create user profile
        profile = get_user_profile(request.user)
        
        profile.visits += 1
        profile.save()
        print(f"DEBUG: Visit added for {game or 'unknown'}. Total visits: {profile.visits}, plays: {profile.plays}")
        
        score = profile.visits + (profile.plays * 5)
        return JsonResponse({
            "status": "success", 
            "visits": profile.visits,
            "plays": profile.plays,
            "game": game,
            "score": score
        })
        
    except Exception as e:
        print(f"DEBUG: Error in add_visit: {e}")
        return JsonResponse({"status": "error", "message": "Internal server error"}, status=500)


@csrf_exempt
def add_play(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        print("DEBUG: User not authenticated")
        return JsonResponse({"status": "error", "message": "User not authenticated"}, status=401)
    
    try:
        # Get or create user profile
        profile = get_user_profile(request.user)
        
        profile.plays += 1
        profile.save()
        print(f"DEBUG: Play added. Total visits: {profile.visits}, plays: {profile.plays}")
        
        score = profile.visits + (profile.plays * 5)
        return JsonResponse({
            "status": "success", 
            "visits": profile.visits,
            "plays": profile.plays,
            "score": score
        })
        
    except Exception as e:
        print(f"DEBUG: Error in add_play: {e}")
        return JsonResponse({"status": "error", "message": "Internal server error"}, status=500)


def site_visit_counter(request):
    """Record a site visit and return current stats."""
    SiteVisit.record_visit()
    stats = SiteVisit.get_stats()
    return JsonResponse({
        "status": "success",
        "today": stats['today'],
        "weekly": stats['weekly'],
        "monthly": stats['monthly'],
        "total": stats['total'],
    })


def site_visit_stats(request):
    """Return current visit stats without recording a new visit."""
    stats = SiteVisit.get_stats()
    return JsonResponse({
        "status": "success",
        "today": stats['today'],
        "weekly": stats['weekly'],
        "monthly": stats['monthly'],
        "total": stats['total'],
    })