from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = environ.get("SECRET_KEY", "mysupersecretkey---pleasechangeme")

DEBUG = int(environ.get("DEBUG", default=1))

ALLOWED_HOSTS = ["*"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

CSRF_TRUSTED_ORIGINS = ["https://*.v3ntrue.xyz"]


DATABASES = {
    # "default": {
    #     "ENGINE": environ.get("DB_ENGINE", "django.db.backends.postgresql_psycopg2"),
    #     "NAME": environ.get("DB_DATABASE", "msp"),
    #     "USER": environ.get("DB_USER", "postgres"),
    #     "PASSWORD": environ.get("DB_PASSWORD", "@nDREE1%"),
    #     # "HOST": environ.get("DB_HOST", "localhost"),
    #     "HOST": environ.get("DB_HOST", "msp_db.v3ntrue.xyz"),
    #     "PORT": environ.get("DB_PORT", "5432"),
    # },
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    },
}