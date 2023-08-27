from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from usuarios.forms import *
from usuarios.models import *
# Register your models here.

@admin.register(Administrador)
class BaseUserAdmin(AuthUserAdmin):
    add_form = BaseUserCreationForm
    form = BaseUserChangeForm  # Form for change view
    model = BaseUser
    # list_display = ["numero_identificacion", "email"]
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Información Personal",
            {
                "fields": (
                    
                    "fecha_de_nacimiento",
                    "phone_no",
                    "sexo",
                    "genero"
                )
            },
        ),
        (
            "Permisos",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        # ("Fechas importantes",
        #   {
        #       "fields": (
        #           "last_login",
        #            "date_joined"
        #         )
        #     }
        # ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username","email", "password1", "password2"),
            },
        ),
    )

    def get_form(self, request, obj=None, **kwargs):
        """
        Use special form during foo creation
        """
        defaults = {}
        if obj is None:
            defaults["form"] = self.add_form
        defaults.update(kwargs)
        return super().get_form(request, obj, **defaults)

    def save_model(self, request, obj, form, change):
        # SUCCESS ACTIONS
        # obj.subscriptionInfo.paid = 1
        # obj.subscriptionInfo.save()
        obj.save()

@admin.register(Cliente)
class ClienteAdmin(AuthUserAdmin):
    add_form = ClienteCreationForm
    form = ClienteChangeForm  # Form for change view
    model = Cliente
    list_display = ["username", "email"]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username","email", "password1", "password2"),
            },
        ),
    )
    fieldsets = (
        (   "Datos de Inicio de Sesión",
            {
              "fields": (
                  "username",
                   "password"
                )
            }
        ),
        (
            "Información Personal",
            {
                "fields": (
                    
                    "fecha_de_nacimiento",
                    "phone_no",
                    "sexo",
                    "genero"
                )
            },
        ),
        # (
        #     "Permisos",
        #     {
        #         "fields": (
        #             "is_active",
        #             "is_staff",
        #             "is_superuser",
        #             "groups",
        #             "user_permissions",
        #         )
        #     },
        # ),
        # ("Fechas importantes",
        #   {
        #       "fields": (
        #           "last_login",
        #            "date_joined"
        #         )
        #     }
        # ),
    )


   

    def save_model(self, request, obj, form, change):
        # SUCCESS ACTIONS
        # obj.subscriptionInfo.paid = 1
        # obj.subscriptionInfo.save()
        obj.save()

@admin.register(Employee)
class EmployeeAdmin(AuthUserAdmin):
    add_form = EmployeeCreationForm
    form = EmployeeChangeForm  # Form for change view
    model = Employee
    list_display = ["username", "email"]
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("username","email", "password1", "password2"),
            },
        ),
    )
    fieldsets = (
        (   "Datos de Inicio de Sesión",
            {
              "fields": (
                  "username",
                   "password"
                )
            }
        ),
        (
            "Información Personal",
            {
                "fields": (
                    
                    "fecha_de_nacimiento",
                    "phone_no",
                    "sexo",
                    "genero"
                )
            },
        ),
        # (
        #     "Permisos",
        #     {
        #         "fields": (
        #             "is_active",
        #             "is_staff",
        #             "is_superuser",
        #             "groups",
        #             "user_permissions",
        #         )
        #     },
        # ),
        # ("Fechas importantes",
        #   {
        #       "fields": (
        #           "last_login",
        #            "date_joined"
        #         )
        #     }
        # ),
    )


   

    def save_model(self, request, obj, form, change):
        # SUCCESS ACTIONS
        # obj.subscriptionInfo.paid = 1
        # obj.subscriptionInfo.save()
        obj.save()

admin.site.register(Direccion)
admin.site.register(Telefono)