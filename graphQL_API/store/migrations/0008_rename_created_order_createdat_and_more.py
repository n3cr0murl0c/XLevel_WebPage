# Generated by Django 4.2.4 on 2023-08-24 15:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('store', '0007_alter_producto_rating'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='created',
            new_name='createdAt',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='cliente',
            new_name='createdBy',
        ),
        migrations.AddField(
            model_name='order',
            name='updatedAt',
            field=models.DateTimeField(null=True, verbose_name='Actualizado'),
        ),
        migrations.AddField(
            model_name='order',
            name='updatedBy',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name=''),
        ),
        migrations.AlterField(
            model_name='producto',
            name='imagenes',
            field=models.ImageField(blank=True, default='products/none/default.png', height_field='image_height', null=True, upload_to='products/images/', verbose_name='Imagen del Producto', width_field='image_width'),
        ),
    ]
