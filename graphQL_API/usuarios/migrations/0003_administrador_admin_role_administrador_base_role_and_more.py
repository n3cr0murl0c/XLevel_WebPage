# Generated by Django 4.2.4 on 2023-08-22 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0002_alter_administrador_options_alter_cliente_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='administrador',
            name='admin_role',
            field=models.BooleanField(default=True, verbose_name='Administrador?'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='base_role',
            field=models.CharField(default='Admin', max_length=50, verbose_name='Rol'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='cliente_role',
            field=models.BooleanField(default=False, verbose_name='employee?'),
        ),
        migrations.AddField(
            model_name='administrador',
            name='employee_role',
            field=models.BooleanField(default=False, verbose_name='Administrador?'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='admin_role',
            field=models.BooleanField(default=False, verbose_name='Administrador?'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='base_role',
            field=models.CharField(default='Cliente', max_length=50, verbose_name='Rol'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='cliente_role',
            field=models.BooleanField(default=True, verbose_name='employee?'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='employee_role',
            field=models.BooleanField(default=False, verbose_name='Administrador?'),
        ),
        migrations.AddField(
            model_name='employee',
            name='admin_role',
            field=models.BooleanField(default=False, verbose_name='Administrador?'),
        ),
        migrations.AddField(
            model_name='employee',
            name='base_role',
            field=models.CharField(default='Employe', max_length=50, verbose_name='Rol'),
        ),
        migrations.AddField(
            model_name='employee',
            name='cliente_role',
            field=models.BooleanField(default=False, verbose_name='employee?'),
        ),
        migrations.AddField(
            model_name='employee',
            name='employee_role',
            field=models.BooleanField(default=True, verbose_name='Administrador?'),
        ),
    ]
