from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.core.validators import RegexValidator
from usuarios.models import *
from django.utils.translation import gettext_lazy as _

class BaseUserCreationForm(UserCreationForm):
    
    email = forms.EmailField(label=_("email"))
    # base_role = forms.CharField(max_length=50)

    class Meta:
        model = BaseUser
        fields = "__all__"
        # exclude  = [
        #     'base_role'
        # ]

class BaseUserChangeForm(UserChangeForm):
    class Meta:
        model = BaseUser
        fields = "__all__"
        # exclude  = [
        #     'base_role'
        # ]


class ClienteCreationForm(UserCreationForm):
    email = forms.EmailField(label=_("email address"))
    class Meta:
        model = Cliente
        fields = "__all__"
    

class ClienteChangeForm(UserChangeForm):
    class Meta:
        model = Cliente
        fields = "__all__"



class EmployeeCreationForm(UserCreationForm):
    email = forms.EmailField(label=_("email address"))
    class Meta:
        model = Employee
        fields = "__all__"
    
    
class EmployeeChangeForm(UserChangeForm):
    class Meta:
        model = Employee
        fields = "__all__"
