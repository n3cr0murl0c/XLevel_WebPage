from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'hT1gatWHXVnXaCJwBY_V2XHl8W7-JYuF5KVPBRec7Po'

DEBUG = False

ALLOWED_HOSTS = ["0.0.0.0", "127.0.0.1", "localhost", "idf.v3ntrue.xyz", ]

CSRF_TRUSTED_ORIGINS = ["https://*.v3ntrue.xyz"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {"require_debug_false": {"()": "django.utils.log.RequireDebugFalse"}},
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins"],
            "level": "ERROR",
            "propagate": True,
        },
    },
}
SECURE_HSTS_SECONDS = 2,592,000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": environ.get("NAME","msp"),
        "USER": environ.get("USER","postgres"),
        "PASSWORD":environ.get("PASSWORD","@nDREE02019868251%"),
        "HOST": environ.get("HOST","msp_db"),
        "PORT":  environ.get("PORT","5432"),
    },
    
}