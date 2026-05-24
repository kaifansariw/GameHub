"""
Django settings for gamehub_project project.
"""

from pathlib import Path
from datetime import timedelta
import os
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')

SECRET_KEY = os.getenv('SECRET_KEY') or os.getenv('DJANGO_SECRET_KEY')
if not SECRET_KEY:
    raise RuntimeError('SECRET_KEY is not set. Add it to backend/.env or the environment.')

DEBUG = os.getenv('DEBUG', 'False').lower() in ('1', 'true', 'yes')

raw_allowed_hosts = os.getenv('ALLOWED_HOSTS')
if raw_allowed_hosts:
    ALLOWED_HOSTS = [host.strip() for host in raw_allowed_hosts.split(',') if host.strip()]
else:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']


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

    'django.contrib.sites',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    
    'allauth.account.middleware.AccountMiddleware',

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

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

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

    "https://game-hub-jade-three.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://game-hub-jade-three.vercel.app",
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

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': os.getenv("GOOGLE_CLIENT_ID"),
            'secret': os.getenv("GOOGLE_CLIENT_SECRET"),
        }
    }
}

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")