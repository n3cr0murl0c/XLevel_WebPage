# Generated by Django 4.2.4 on 2023-08-23 21:19

from django.db import migrations, models
import django.db.models.deletion
import store.models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0006_telefono_alias'),
        ('store', '0004_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo_principal', models.CharField(max_length=50, verbose_name='Codigo Principal')),
                ('nombre', models.CharField(max_length=150, verbose_name='Nombre del Producto')),
                ('precio', models.FloatField(verbose_name='Precio del Producto')),
                ('imagenes', models.ImageField(blank=True, default='products/none/default.png', height_field='image_height', null=True, upload_to=store.models.PathAndRename, verbose_name='Imagen del Producto', width_field='image_width')),
                ('rating', models.IntegerField(default=0, verbose_name='Rating del Producto')),
            ],
            options={
                'verbose_name': 'Producto',
                'verbose_name_plural': 'Productos',
            },
        ),
        migrations.CreateModel(
            name='WishList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateAdded', models.DateField(auto_now=True, verbose_name='Date Added')),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist', to='usuarios.cliente', verbose_name='Usuario')),
                ('producto', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.producto', verbose_name='Producto')),
            ],
            options={
                'verbose_name': 'WishList',
                'verbose_name_plural': 'Wishlists',
            },
        ),
    ]
