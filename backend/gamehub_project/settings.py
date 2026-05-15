"""
Django settings for gamehub_project project.
"""

from pathlib import Path
from datetime import timedelta
import os
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')

def env_bool(name, default=False):
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip().lower() in {'1', 'true', 't', 'yes', 'y', 'on'}


def env_list(name, default=''):
    value = os.environ.get(name, default)
    return [item.strip() for item in value.split(',') if item.strip()]


DEBUG = env_bool('DEBUG', False)

# Keep a dev-only fallback key to avoid breaking local onboarding.
# In non-debug environments, SECRET_KEY must be explicitly provided.
SECRET_KEY = os.environ.get('SECRET_KEY', '').strip()
if not SECRET_KEY:
    if DEBUG:
        # Generate an ephemeral, in-memory secret for development to avoid
        # committing a fallback key in source control. This secret will
        # not persist across process restarts — set `SECRET_KEY` in
        # `backend/.env` for a persistent local value.
        import secrets
        import warnings

        SECRET_KEY = secrets.token_urlsafe(50)
        warnings.warn(
            'DEBUG=True and SECRET_KEY not set; using ephemeral in-memory secret. '
            'For persistent local sessions, set SECRET_KEY in backend/.env',
            UserWarning
        )
    else:
        raise ImproperlyConfigured('SECRET_KEY environment variable must be set when DEBUG is False.')

ALLOWED_HOSTS = env_list('ALLOWED_HOSTS', 'localhost,127.0.0.1') if DEBUG else env_list('ALLOWED_HOSTS')
if not DEBUG and not ALLOWED_HOSTS:
    raise ImproperlyConfigured('ALLOWED_HOSTS environment variable must be set when DEBUG is False.')


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'accounts',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'gamehub_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'gamehub_project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ============================================================
# Django REST Framework
# ============================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

# ============================================================
# JWT Settings
# ============================================================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=24),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ============================================================
# CORS Settings — Allow React dev server
# ============================================================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept', 'accept-encoding', 'authorization',
    'content-type', 'dnt', 'origin', 'user-agent',
    'x-csrftoken', 'x-requested-with',
]

# ============================================================
# Security Headers — Allow Google OAuth popup windows
# ============================================================
# This is CRITICAL for Google Sign-In popup to work.
# Without this, browsers with COOP=same-origin will block the popup.
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin-allow-popups'

# Google OAuth2.0 Client ID (loaded from .env)
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID', '')
# ============================================================
# Email Settings (Development)
# ============================================================
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'noreply@gamehub.cosmos'

# ============================================================
# DRF Spectacular — OpenAPI 3.0 Schema Configuration
# ============================================================
SPECTACULAR_SETTINGS = {
    'TITLE': 'GameHub API — Cosmic Edition',
    'DESCRIPTION': (
        'The official REST API documentation for **GameHub: Cosmic Edition**. \n\n'
        'All endpoints are served under `/api/`. Authentication uses **JWT Bearer tokens** — '
        'login via `/api/auth/login/` to receive your `access` and `refresh` tokens, '
        'then pass the `access` token in the `Authorization: Bearer <token>` header.\n\n'
        '**Base URL:** `http://localhost:8000`'
    ),
    'VERSION': '2.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'CONTACT': {
        'name': 'GameHub Development Team',
        'email': 'support@gamehub.cosmos',
    },
    'LICENSE': {
        'name': 'MIT License',
    },
    # Group endpoints by tag (maps to URL path prefixes)
    'TAGS': [
        {'name': 'Authentication', 'description': 'Login, registration, JWT token management, and password reset flows.'},
        {'name': 'Profile', 'description': 'Retrieve or manage the authenticated user\'s profile and game statistics.'},
        {'name': 'Leaderboard', 'description': 'Global leaderboard ranked by player score (visits + plays × 5).'},
        {'name': 'Game Tracking', 'description': 'Track game visits, plays, and submit high scores.'},
        {'name': 'Feedback', 'description': 'Submit user feedback or contact messages.'},
    ],
    # Swagger UI enhancements
    'SWAGGER_UI_SETTINGS': {
        'deepLinking': True,
        'persistAuthorization': True,
        'displayOperationId': False,
        'defaultModelsExpandDepth': 2,
    },
    # Security — define JWT Bearer scheme for Swagger "Authorize" button
    'SECURITY': [{'BearerAuth': []}],
    'PREPROCESSING_HOOKS': ['drf_spectacular.hooks.preprocess_exclude_path_format'],
    'POSTPROCESSING_HOOKS': ['drf_spectacular.hooks.postprocess_schema_enums'],
    'COMPONENT_SPLIT_REQUEST': True,
}
