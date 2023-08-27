
import os
from whitenoise import WhiteNoise
from django.core.wsgi import get_wsgi_application
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'graphQL_API.settings.prod')

application = WhiteNoise(get_wsgi_application(), root=settings.STATIC_ROOT)
