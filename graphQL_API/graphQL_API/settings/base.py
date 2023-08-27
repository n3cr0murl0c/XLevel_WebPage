from os import path, environ
from pathlib import Path
from django.urls import reverse_lazy
from django.contrib import messages

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    # "store",
    "graphene_django",
    'usuarios',
    'store.apps.StoreConfig'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",#SIEMPRE DEBE IR DESPUES DE SECURITY MCED
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'graphQL_API.urls'

TEMPLATE_PATH = path.join(Path(__file__).resolve().parent.parent.parent, "Templates")
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            TEMPLATE_PATH,
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = 'graphQL_API.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
AUTHENTICATION_BACKENDS = [
    "graphql_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
]

# Internationalization

LANGUAGE_CODE = "es-es"

TIME_ZONE = "America/Guayaquil"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    path.join(Path(__file__).resolve().parent.parent.parent, "static"),
    path.join(Path(__file__).resolve().parent.parent, "bkstatic"),
]
# Default primary key field type

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "usuarios.BaseUser"
DATE_INPUT_FORMATS = ['%d/%m/%Y']
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# web accessible folder
STATIC_ROOT = Path(__file__).resolve().parent.parent.parent / "staticfiles"
# print(f"STATIC SIRVIENDO AQUI ---------->>>>>>>{STATIC_ROOT}<<<<<<<<<<-----------")
STATIC_URL = "static/"

# MEDIA_ROOT ='/usr/src/media/'
MEDIA_ROOT = Path(__file__).resolve().parent.parent.parent / "media"
MEDIA_URL = "media/"
# print(path.join(Path(__file__).resolve().parent.parent,'static'))
# print(STATIC_ROOT,MEDIA_ROOT)

SECURE_HSTS_SECONDS = 2_592_000
# LOGIN_URL = reverse_lazy("login")
# LOGIN_REDIRECT_URL = reverse_lazy("Inicio")


#*****************************GRAPHENE SETTINGS**********************************
GRAPHENE = {
    "SCHEMA": "graphQL_API.graphQL_API.schema.schema",
    "MIDDLEWARE": [
        "graphql_jwt.middleware.JSONWebTokenMiddleware",
    ],
}
CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
]