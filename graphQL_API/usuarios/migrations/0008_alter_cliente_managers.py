# Generated by Django 4.2.4 on 2023-08-24 15:46

import django.contrib.auth.models
from django.db import migrations
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0007_alter_cliente_managers_alter_direccion_cliente'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='cliente',
            managers=[
                ('cliente_manager', django.db.models.manager.Manager()),
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
