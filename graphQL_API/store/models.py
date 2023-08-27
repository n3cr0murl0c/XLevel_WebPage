import datetime
from django.db import models
from usuarios.models import *
from django.utils.translation import gettext_lazy as _
import os
from uuid import uuid4
from django.utils.deconstruct import deconstructible
from django.core.validators import MaxValueValidator, MinValueValidator
@deconstructible
class PathAndRename(object):

    def __init__(self, instance, sub_path):
        self.path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
        # return the whole path to the file
        return os.path.join(self.path, filename)
#####################################

class Order(models.Model):
    class Meta:
        verbose_name = 'Orden'
        verbose_name_plural = 'Ordenes'
    class Estados(models.TextChoices):
        LISTO=('Listo','Listo para envíar')
        ENTREGADO = ('Entregado al Cliente','Entregado al Cliente')
        ENESPERA = ('En Espera para enviar','En espera para enviar')
        ENCAMINO = ('Enviado al Cliente','Enviado al Cliente')
        PREPARACION = ('Orden preparandose para enviar','Orden en Preparacion')

    createdBy = models.ForeignKey(Cliente,on_delete=models.CASCADE,related_name='orden')
    createdAt=models.DateTimeField(_("Creado en:"), auto_now=True, auto_now_add=False)
    total_de_orden = models.FloatField(_("Total de la Orden"))
    direccion_de_envio = models.ForeignKey(Direccion, on_delete=models.CASCADE,related_name='orden')
    estado = models.CharField(_("Estado"),choices=Estados.choices, max_length=50)
    
    updatedAt = models.DateTimeField(_("Actualizado"), null=True)
    updatedBy = models.ForeignKey(BaseUser, verbose_name=_(""), on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return 'Order #'+str(self.id)+' status: '+self.estado
    
    def updateOrder(self,persona:BaseUser):
        self.updatedBy = persona
        self.updatedAt = datetime.datetime.now()
    

class Producto(models.Model):
    class Meta:
        verbose_name= 'Producto'
        verbose_name_plural='Productos'
    
    codigo_principal = models.CharField(_("Codigo Principal"), max_length=50)
    nombre = models.CharField(_("Nombre del Producto"), max_length=150)
    precio = models.FloatField(_("Precio del Producto"))
    image_height=models.PositiveIntegerField()
    image_width=models.PositiveIntegerField()
    imagenes = models.ImageField(_("Imagen del Producto"),
                                #  upload_to=PathAndRename,
                                upload_to='products/images/',
                                 null=True, blank=True,
                                 default="products/none/default.png",
                                 height_field="image_height",
                                 width_field="image_width"
                                 )
    enDestacado= models.BooleanField(_("Destacado"), default=False)
    enDescuento = models.BooleanField(_("Descuento"),default=False)
    rating = models.PositiveIntegerField(_("Rating del Producto"),default=0,
                                         validators=[MinValueValidator(0), MaxValueValidator(5)])
    def __str__(self) -> str:
        return self.nombre

class WishList(models.Model):
    class Meta:
        verbose_name = 'WishList'
        verbose_name_plural ='Wishlists'
    cliente = models.ForeignKey(Cliente, verbose_name=_("Usuario"), on_delete=models.CASCADE, related_name='wishlist')
    producto = models.ForeignKey(Producto, verbose_name=_("Producto"), on_delete=models.SET_NULL,null=True,blank=True)
    dateAdded = models.DateField(_("Date Added"), auto_now=True, auto_now_add=False)





class OrderItem(models.Model):
    pass