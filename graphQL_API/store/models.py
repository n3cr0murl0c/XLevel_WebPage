from django.db import models

# Create your models here.
class Cliente(models.Model):
    class Meta:
        verbose_name ='Cliente'
        verbose_plural = 'Clientes'