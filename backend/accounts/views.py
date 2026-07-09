from django.contrib.auth.models import User
from django.contrib import auth
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile, GameScore, UserMessage
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from drf_spectacular.utils import extend_schema, OpenApiExample, OpenApiResponse
import json


def get_user_profile(user):
    profile, created = Profile.objects.get_or_create(user=user)
    return profile


# ============================================================
# AUTH ENDPOINTS
# ============================================================

@extend_schema(
    tags=['Authentication'],
    summary='Login with username/email and password',
    description=(
        'Authenticates a user and returns a JWT access token and refresh token. '
        'Accepts either a **username** or **email** in the `username` field.'
    ),
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'username': {'type': 'string', 'description': 'Username or email address'},
                'password': {'type': 'string', 'description': 'Account password'},
            },
            'required': ['username', 'password'],
        }
    },
    responses={
        200: OpenApiResponse(description='Login successful. Returns access, refresh tokens and user data.'),
        400: OpenApiResponse(description='Missing required fields.'),
        401: OpenApiResponse(description='Invalid username or password.'),
        403: OpenApiResponse(description='Account is inactive.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username_or_email = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()

    if not username_or_email or not password:
        return Response({'error': 'Both fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Try standard username login first
    user = auth.authenticate(username=username_or_email, password=password)
    
    # If fails, check if input is an email (case-insensitive)
    if user is None and '@' in username_or_email:
        try:
            user_obj = User.objects.filter(email__iexact=username_or_email).first()
            if user_obj:
                user = auth.authenticate(username=user_obj.username, password=password)
        except Exception:
            pass

    if user is None:
        return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        return Response({'error': 'Account is inactive.'}, status=status.HTTP_403_FORBIDDEN)

    get_user_profile(user)
    refresh = RefreshToken.for_user(user)
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
    })


@extend_schema(
    tags=['Authentication'],
    summary='Register a new player account',
    description=(
        'Creates a new GameHub user account and returns JWT tokens for immediate login. '
        'All fields are required. Email and username must be unique across the system.'
    ),
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'first_name': {'type': 'string'},
                'last_name': {'type': 'string'},
                'username': {'type': 'string', 'description': 'Must be unique'},
                'email': {'type': 'string', 'format': 'email', 'description': 'Must be unique'},
                'password1': {'type': 'string', 'description': 'Password'},
                'password2': {'type': 'string', 'description': 'Confirm password (must match password1)'},
            },
            'required': ['first_name', 'last_name', 'username', 'email', 'password1', 'password2'],
        }
    },
    responses={
        201: OpenApiResponse(description='Registration successful. Returns tokens and user object.'),
        400: OpenApiResponse(description='Validation error — missing fields, passwords do not match, or duplicate username/email.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_register(request):
    first_name = request.data.get('first_name', '').strip()
    last_name  = request.data.get('last_name', '').strip()
    username   = request.data.get('username', '').strip()
    email      = request.data.get('email', '').strip()
    password1  = request.data.get('password1', '')
    password2  = request.data.get('password2', '')

    if not all([first_name, last_name, username, email, password1, password2]):
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if password1 != password2:
        return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(
            username=username, password=password1,
            email=email, first_name=first_name, last_name=last_name
        )
        get_user_profile(user)
        
        # Return tokens immediately for auto-login
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Registration successful!',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }, status=status.HTTP_201_CREATED)
    except Exception:
        return Response({'error': 'Registration failed. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=['Authentication'],
    summary='Logout (client-side token invalidation)',
    description='JWT logout is handled client-side by deleting the stored tokens. This endpoint confirms the logout action.',
    responses={200: OpenApiResponse(description='Logged out successfully.')},
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_logout(request):
    # With JWT, logout is handled client-side by deleting the token.
    # Optionally blacklist the refresh token if blacklist app is enabled.
    return Response({'message': 'Logged out successfully.'})


@extend_schema(
    tags=['Authentication'],
    summary='Request a password reset email',
    description=(
        'Sends a password reset link to the given email if an account exists. '
        'In **DEBUG mode**, the reset URL is also returned in the response body for testing.'
    ),
    request={
        'application/json': {
            'type': 'object',
            'properties': {'email': {'type': 'string', 'format': 'email'}},
            'required': ['email'],
        }
    },
    responses={
        200: OpenApiResponse(description='Reset email sent (or silently skipped if no account found).'),
        400: OpenApiResponse(description='Email is required.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_forgot_password(request):
    email = request.data.get('email', '').strip()
    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(email__iexact=email).first()
    if user:
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # In a real app, you'd point this to your frontend reset page
        reset_url = f"{settings.CORS_ALLOWED_ORIGINS[0]}/reset-password/{uid}/{token}/"
        
        subject = "Password Reset Request - GameHub"
        message = f"Hello {user.username},\n\nYou requested a password reset. Click the link below to set a new password:\n\n{reset_url}\n\nIf you didn't request this, please ignore this email."
        
        try:
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])
        except Exception:
            return Response({'error': 'Failed to send email. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Return success message
    response_data = {'message': 'If an account exists with this email, a reset link has been sent.'}
    
    # For easier testing in development, include the link in the response
    if settings.DEBUG and user:
        response_data['dev_reset_url'] = reset_url
        
    return Response(response_data)


@extend_schema(
    tags=['Authentication'],
    summary='Confirm password reset with token',
    description='Validates the UID and token from the reset email and sets the new password.',
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'uid': {'type': 'string', 'description': 'Base64-encoded user ID from reset link'},
                'token': {'type': 'string', 'description': 'Password reset token from email link'},
                'password': {'type': 'string', 'description': 'The new password to set'},
            },
            'required': ['uid', 'token', 'password'],
        }
    },
    responses={
        200: OpenApiResponse(description='Password reset successful.'),
        400: OpenApiResponse(description='Invalid or expired token, or missing fields.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_reset_password(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('password')

    if not all([uidb64, token, new_password]):
        return Response({'error': 'UID, token and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password has been reset successfully.'})
    else:
        return Response({'error': 'Invalid or expired reset link.'}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=['Authentication'],
    summary='Refresh JWT access token',
    description='Accepts a valid refresh token and returns a new access token.',
    request={
        'application/json': {
            'type': 'object',
            'properties': {'refresh': {'type': 'string', 'description': 'A valid JWT refresh token'}},
            'required': ['refresh'],
        }
    },
    responses={
        200: OpenApiResponse(description='New access token returned.'),
        401: OpenApiResponse(description='Refresh token is invalid or expired.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_token_refresh(request):
    from rest_framework_simplejwt.serializers import TokenRefreshSerializer
    from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
    
    serializer = TokenRefreshSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)
    except TokenError as e:
        raise InvalidToken(e.args[0])
        
    return Response(serializer.validated_data, status=status.HTTP_200_OK)


# ============================================================
# USER / PROFILE
# ============================================================

@extend_schema(
    tags=['Profile'],
    summary='Get authenticated user profile',
    description=(
        'Returns the current user\'s data, profile stats (visits, plays, score), '
        'and all per-game high scores. **Requires Bearer token.**\n\n'
        'Score formula: `visits + (plays × 5)`'
    ),
    responses={
        200: OpenApiResponse(description='User profile, stats and game scores returned successfully.'),
        401: OpenApiResponse(description='Authentication credentials were not provided or are invalid.'),
    },
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_profile(request):
    user = request.user
    profile = get_user_profile(user)
    scores = GameScore.objects.filter(user=user).order_by('-updated_at')
    score = profile.visits + (profile.plays * 5)

    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
        },
        'profile': {
            'visits': profile.visits,
            'plays': profile.plays,
            'score': score,
        },
        'scores': [
            {
                'game_id': s.game_id,
                'score': s.score,
                'updated_at': s.updated_at.isoformat(),
            }
            for s in scores
        ]
    })


# ============================================================
# LEADERBOARD
# ============================================================

@extend_schema(
    tags=['Leaderboard'],
    summary='Get global player leaderboard',
    description=(
        'Returns all players ranked by their total score in descending order. '
        'Score formula: `visits + (plays × 5)`. No authentication required.'
    ),
    responses={200: OpenApiResponse(description='Ranked list of all players with their stats.')},
)
@api_view(['GET'])
@permission_classes([AllowAny])
def api_leaderboard(request):
    users = Profile.objects.select_related('user').extra(
        select={'score': 'visits + (plays * 5)'}
    ).order_by('-score')

    data = [
        {
            'rank': idx + 1,
            'username': p.user.username,
            'visits': p.visits,
            'plays': p.plays,
            'score': p.visits + (p.plays * 5),
        }
        for idx, p in enumerate(users)
    ]
    return Response(data)


# ============================================================
# GAME TRACKING
# ============================================================

@extend_schema(
    tags=['Game Tracking'],
    summary='Record a game page visit',
    description='Increments the authenticated user\'s visit counter by 1. Called when a game page is opened.',
    responses={
        200: OpenApiResponse(description='Visit recorded. Returns updated visits, plays, and score.'),
        500: OpenApiResponse(description='Internal server error.'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_add_visit(request):
    try:
        game = request.data.get('game')
        profile = get_user_profile(request.user)
        profile.visits += 1
        profile.save()
        score = profile.visits + (profile.plays * 5)
        return Response({'status': 'success', 'visits': profile.visits, 'plays': profile.plays, 'score': score})
    except Exception:
        return Response({'error': 'Failed to record visit. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=['Game Tracking'],
    summary='Record a game play',
    description='Increments the authenticated user\'s play counter by 1. Worth 5× more than a visit in score calculation.',
    responses={
        200: OpenApiResponse(description='Play recorded. Returns updated visits, plays, and score.'),
        500: OpenApiResponse(description='Internal server error.'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_add_play(request):
    try:
        profile = get_user_profile(request.user)
        profile.plays += 1
        profile.save()
        score = profile.visits + (profile.plays * 5)
        return Response({'status': 'success', 'visits': profile.visits, 'plays': profile.plays, 'score': score})
    except Exception:
        return Response({'error': 'Failed to record play. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@extend_schema(
    tags=['Game Tracking'],
    summary='Save a game high score',
    description='Saves the player\'s score for a specific game. Only updates if the new score is **higher** than the current high score.',
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'game_id': {'type': 'string', 'description': 'Unique slug of the game (e.g. `snake`, `tetris`)'},
                'score': {'type': 'integer', 'description': 'The score achieved in this session'},
            },
            'required': ['game_id', 'score'],
        }
    },
    responses={
        200: OpenApiResponse(description='Score saved or updated. Returns the current high score.'),
        400: OpenApiResponse(description='Missing game_id or score.'),
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def api_save_score(request):
    try:
        game_id = request.data.get('game_id')
        score = request.data.get('score')

        if not game_id or score is None:
            return Response({'error': 'Missing game_id or score'}, status=status.HTTP_400_BAD_REQUEST)

        game_score, created = GameScore.objects.get_or_create(user=request.user, game_id=game_id)
        if score > game_score.score:
            game_score.score = score
            game_score.save()
            return Response({'status': 'success', 'message': 'New high score!', 'high_score': game_score.score})
        return Response({'status': 'success', 'message': 'Score saved', 'high_score': game_score.score})
    except Exception:
        return Response({'error': 'Failed to save score. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ============================================================
# FEEDBACK
# ============================================================

@extend_schema(
    tags=['Feedback'],
    summary='Submit user feedback or a support message',
    description='Stores a message from the user (or an anonymous visitor) in the database.',
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'content': {'type': 'string', 'description': 'The feedback message content'},
            },
            'required': ['content'],
        }
    },
    responses={
        200: OpenApiResponse(description='Feedback received successfully.'),
        400: OpenApiResponse(description='Content field is required.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_send_feedback(request):
    content = request.data.get('content', '').strip()
    if not content:
        return Response({'error': 'Content is required'}, status=status.HTTP_400_BAD_REQUEST)

    msg = UserMessage.objects.create(
        user=request.user if request.user.is_authenticated else None,
        content=content
    )
    return Response({'status': 'success', 'message': 'Feedback sent! We appreciate your support.', 'id': msg.id})


# ============================================================
# KEEP OLD TEMPLATE VIEWS (for Django admin compatibility)
# ============================================================

def logout(request):
    auth.logout(request)
    return __import__('django.shortcuts', fromlist=['redirect']).redirect('/')


# ============================================================
# GOOGLE OAUTH 2.0 — Issue #348
# ============================================================

@extend_schema(
    tags=['Authentication'],
    summary='Login or register via Google OAuth2.0',
    description=(
        'Accepts a Google **id_token** (credential) from the frontend `@react-oauth/google` library. '
        'Verifies the token with Google\'s public keys, then:\n\n'
        '- If the email exists: logs in the existing user.\n'
        '- If the email is new: auto-creates a new user account using the Google profile data.\n\n'
        'Returns the same JWT `access` and `refresh` tokens as the standard login endpoint.'
    ),
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'credential': {
                    'type': 'string',
                    'description': 'The Google id_token (JWT) returned by the Google Identity Services SDK.'
                }
            },
            'required': ['credential'],
        }
    },
    responses={
        200: OpenApiResponse(description='Login/registration successful. Returns access & refresh JWT tokens + user data.'),
        400: OpenApiResponse(description='Credential is missing.'),
        401: OpenApiResponse(description='Invalid or expired Google token.'),
        500: OpenApiResponse(description='GOOGLE_CLIENT_ID is not configured on the server.'),
    },
)
@api_view(['POST'])
@permission_classes([AllowAny])
def api_google_login(request):
    """
    Accept a Google id_token (credential) from the frontend GoogleLogin component.
    Verifies it locally using google-auth library (no extra network call needed),
    then creates or logs in the GameHub user and returns JWT tokens.
    """
    import logging
    from django.conf import settings as django_settings

    logger = logging.getLogger(__name__)

    credential = request.data.get('credential', '').strip()

    if not credential:
        return Response({'error': 'Google credential is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # ── Step 1: Verify the Google id_token using google-auth ──────
    try:
        from google.oauth2 import id_token
        from google.auth.transport import requests as google_requests

        google_client_id = getattr(django_settings, 'GOOGLE_CLIENT_ID', '')
        if not google_client_id:
            logger.error('GOOGLE_CLIENT_ID is not configured in Django settings.')
            return Response(
                {'error': 'Google login is not configured on the server.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # This verifies the token signature, expiry, and audience — no network call needed
        google_data = id_token.verify_oauth2_token(
            credential,
            google_requests.Request(),
            google_client_id,
            clock_skew_in_seconds=10,
        )
        logger.info(f"Google id_token verified for: {google_data.get('email', 'unknown')}")

    except ValueError as e:
        logger.error(f"Google id_token validation failed: {str(e)}")
        return Response(
            {'error': f'Invalid Google token: {str(e)}'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except Exception as e:
        logger.error(f"Google token verification unexpected error: {e}", exc_info=True)
        return Response(
            {'error': 'Could not verify Google token. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    # ── Step 2: Extract verified data ────────────────────────────
    verified_email      = google_data.get('email', '').lower()
    verified_first_name = google_data.get('given_name', '')
    verified_last_name  = google_data.get('family_name', '')
    email_verified      = google_data.get('email_verified', False)

    if not verified_email:
        return Response({'error': 'Google account has no email address.'}, status=status.HTTP_400_BAD_REQUEST)

    if not email_verified:
        return Response({'error': 'Google email address is not verified.'}, status=status.HTTP_400_BAD_REQUEST)

    # ── Step 3: Find or create the Django user ────────────────────
    user = User.objects.filter(email__iexact=verified_email).first()

    if user is None:
        base_username = verified_email.split('@')[0].replace('.', '_').replace('-', '_')
        username = base_username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}_{counter}"
            counter += 1

        try:
            user = User.objects.create_user(
                username=username,
                email=verified_email,
                first_name=verified_first_name,
                last_name=verified_last_name,
                password=User.objects.make_random_password(),
            )
            get_user_profile(user)
            is_new_user = True
            logger.info(f"New user created via Google: {username} ({verified_email})")
        except Exception as e:
            logger.error(f"Failed to create user: {e}", exc_info=True)
            return Response({'error': 'Failed to create account. Please try again.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        updated = False
        if not user.first_name and verified_first_name:
            user.first_name = verified_first_name
            updated = True
        if not user.last_name and verified_last_name:
            user.last_name = verified_last_name
            updated = True
        if updated:
            user.save()
        is_new_user = False
        logger.info(f"Existing user logged via Google: {user.username} ({verified_email})")

    # ── Step 4: Issue GameHub JWT tokens ─────────────────────────
    refresh = RefreshToken.for_user(user)
    return Response({
        'access':     str(refresh.access_token),
        'refresh':    str(refresh),
        'is_new_user': is_new_user,
        'user': {
            'id':         user.id,
            'username':   user.username,
            'email':      user.email,
            'first_name': user.first_name,
            'last_name':  user.last_name,
        }
    }, status=status.HTTP_200_OK)
