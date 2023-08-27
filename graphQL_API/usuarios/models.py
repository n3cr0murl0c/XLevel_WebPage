from typing import Iterable, Optional
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
# Create your models here.
class BaseUser(AbstractUser):
    class Meta:
        verbose_name ='Usuario'
        verbose_name_plural = 'Usuarios'
    
    class Role(models.TextChoices):
        CLIENTE = "Cliente", "Cliente"
        ADMINISTRACION = "Admin", "Admin"
        EMPLOYEE = "Employee", "Employee"
        
    class Sexo(models.TextChoices):
        HOMBRE = "Hombre", "Hombre"
        MUJER = "Mujer", "Mujer"
        
    class Genero(models.TextChoices):
        MASCULINO = "MASCULINO", "Masculino"
        FEMENINO = "FEMENINO", "Femenino"
        NO_BINARIO = "NO_BINARIO", "No Binario"
        TRANSGENERO = "TRANSGENERO", "Transgénero"
        INTERSEX = "INTERSEX", "Intersex"
        NOT_SAY = "NOT_SAY", "Prefiero no Decirlo"

    
    phone_regex = RegexValidator(
        regex=r"^\+?1?\d{9,12}$",
        message=_(
            "El Número debe tener 10 digitos \n ó 12 en el formato '+593 xx xxx'"
        ),
    )
    phone_no = models.CharField(validators=[phone_regex], max_length=15, blank=True, null=False)#not Optional
    fecha_de_nacimiento = models.DateField(null=True, blank=True)#Optional
    sexo = models.CharField(_("Sexo"),choices=Sexo.choices, max_length=50,null=True)
    genero = models.CharField(_("Género"),choices=Genero.choices, max_length=50,null=True)
    

class ClienteManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(base_role=BaseUser.Role.CLIENTE)
class AdminManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(base_role=BaseUser.Role.ADMINISTRACION)
class EmployeeManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(base_role=BaseUser.Role.EMPLOYEE)
    

class Cliente(BaseUser):
    class Meta:
        verbose_name ='Cliente'
        verbose_name_plural = 'Clientes'

    base_role = models.CharField(_("Rol"),default=BaseUser.Role.CLIENTE, max_length=50)
    cliente_manager=ClienteManager()
    subscripcion_noticias = models.BooleanField(_("Subscrito"),default=False)
    terminos_y_condiciones = models.BooleanField(_("Terminos y Condiciones"), default=False)
    isAdmin = models.BooleanField(_("Administrador?"), default=False)
    isCliente = models.BooleanField(_("employee?"), default=True)
    isEmployee = models.BooleanField(_("Administrador?"), default=False)

class Administrador(BaseUser):
    class Meta:
        verbose_name ='Administrador'
        verbose_name_plural = 'Administradores'
    admin=AdminManager()
    base_role = models.CharField(_("Rol"),default=BaseUser.Role.ADMINISTRACION, max_length=50)
    isAdmin = models.BooleanField(_("Administrador?"), default=True)
    isCliente = models.BooleanField(_("employee?"), default=False)
    isEmployee = models.BooleanField(_("Administrador?"), default=False)

class Employee(BaseUser):
    class Meta:
        verbose_name ='Empleado'
        verbose_name_plural = 'Empleados'
    employee=EmployeeManager()
    base_role = models.CharField(_("Rol"),default=BaseUser.Role.EMPLOYEE, max_length=50)
    isAdmin = models.BooleanField(_("Administrador?"), default=False)
    isCliente = models.BooleanField(_("employee?"), default=False)
    isEmployee = models.BooleanField(_("Administrador?"), default=True)

class Direccion(models.Model):
    class Meta:
        verbose_name = 'Dirección'
        verbose_name_plural = ' Direcciones'
    
    class Paises(models.TextChoices):
        Ecuador =('Ecuador','Ecuador')

    class Provincias(models.TextChoices):
        
        Azuay =('Azuay','Azuay')
        Bolívar = ('Bolívar','Bolívar')
        Canar = ('Cañar','Cañar')
        Carchi = ('Carchi','Carchi')
        Chimborazo =('Chimborazo','Chimborazo')
        Cotopaxi = ('Cotopaxi','Cotopaxi')
        El_Oro  = ('El Oro','El Oro')
        Esmeraldas = ('Esmeraldas','Esmeraldas')
        Galapagos = ('Galápagos','Galápagos')
        Guayas = ('Guayas','Guayas')
        Imbabura = ('Imbabura','Imbabura')
        Loja = ('Loja','Loja')
        Los_Rios = ('Los Ríos','Los Ríos')
        Manabi = ('Manabí','Manabí')
        Morona_Santiago = ('Morona Santiago','Morona Santiago')
        Napo = ('Napo','Napo')
        Orellana = ('Orellana','Orellana')
        Pastaza = ('Pastaza','Pastaza')
        Pichincha = ('Pichincha','Pichincha')
        Santa_Elena = ('Santa Elena','Santa Elena')
        sto_domingo = ('Santo Domingo de los Tsáchilas','Santo Domingo de los Tsáchilas')
        Sucumbios = ('Sucumbíos','Sucumbíos')
        Tungurahua = ('Tungurahua','Tungurahua')
        Zamora_Chinchipe = ('Zamora Chinchipe','Zamora Chinchipe')
        
    cliente = models.ForeignKey(Cliente,related_name='direcciones', on_delete=models.CASCADE)
    alias = models.CharField(_("Alias"), max_length=50)
    nombres = models.CharField(_("Nombres"), max_length=150)
    apellidos = models.CharField(_("Apellidos"), max_length=150)
    empresa = models.CharField(_("Empresa"), max_length=50, blank=True, default='', null=True)#optional
    nui = models.CharField(_("Cédula/RUC/Pasaporte"), max_length=25)
    calle_principal = models.CharField(_("Calle Principal"), max_length=150)
    calle_secundaria = models.CharField(_("Calle Secundaria"), max_length=150)
    nro_casa = models.CharField(_("Número de Casa"), max_length=50)
    pais = models.CharField(_("País"), max_length=50, choices=Paises.choices)
    estado = models.CharField(_("Estado/Provincia"), max_length=50, choices=Provincias.choices)
    ciudad  = models.CharField(_("Ciudad"), max_length=50)
    aclaraciones = models.CharField(_("Aclaraciones"), max_length=150)
    def __str__(self) -> str:
        return self.alias
    # def save(self, *args, **kwargs) -> None:
    #     self.nombres=self.cliente.first_name
    #     self.apellidos=self.cliente.last_name        
    #     super.save(self,*args, **kwargs)
class Telefono(models.Model):
    class Meta:
        verbose_name = 'Teléfono'
        verbose_name_plural = 'Telefonos'
    alias = models.CharField(_("Alias"), max_length=50)
    telefono = models.CharField(_("telefono"), max_length=50)
    cliente = models.ForeignKey(Cliente,related_name='telefono', on_delete=models.CASCADE)
    direccion = models.ForeignKey(Direccion,related_name='telefono', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.alias