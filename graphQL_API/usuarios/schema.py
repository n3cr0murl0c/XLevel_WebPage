# from usuarios.models import Cliente
from django.contrib.auth import get_user_model
from usuarios.models import Direccion as DireccionModel
from usuarios.models import Telefono as TelefonosModel
from usuarios.models import Cliente as ClienteModel
from usuarios.models import BaseUser
import graphene
from graphene_django import DjangoObjectType

class BaseUserType(DjangoObjectType):
    class Meta:
        model = BaseUser
        fields = "__all__"
class Cliente(DjangoObjectType):
    class Meta:
        model = ClienteModel
        # fields = "__all__"
        exclude=[
            
            'cliente_manager',
            ]
    def resolve_Cliente(self,id):
        return ClienteModel.objects.get(pk=id)
    
    def resolve_directions(self, cliente_id):
        return ClienteModel.objects.filter(id=cliente_id).select_related('direccion')

class Direccion(DjangoObjectType):
    class Meta:
        model= DireccionModel
        fields = "__all__"
        
    
    def resolve_direccion(self,cliente):
        return DireccionModel.objects.filter(cliente_id=cliente)

class Telefono(DjangoObjectType):
    class Meta:
        model= TelefonosModel
        fields ="__all__"

    def resolve_telefono(self, cliente):
        return TelefonosModel.objects.filter(cliente_id=cliente)
    
class ClienteType(DjangoObjectType):
    class Meta:
        model = ClienteModel

class CreateUser(graphene.Mutation):
    user = graphene.Field(ClienteType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        fecha_de_nacimiento = graphene.Date(required=False)
        genero = graphene.String(required=False)
        sexo = graphene.String(required=False)
        phone_no = graphene.String(required=False)
    
    def mutate(self, info, username, password, email,
               first_name, last_name, fecha_de_nacimiento,
               genero,sexo,phone_no):
        user = ClienteModel.objects.create(
            username=username,
            email=email,
            first_name = first_name,
            last_name=last_name,
            fecha_de_nacimiento=fecha_de_nacimiento,
            genero=genero,
            sexo=sexo,
            phone_no=phone_no
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)
    
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

class Query(graphene.ObjectType):
    clientes = graphene.List(Cliente)
    def resolve_clientes(self,info):
        return ClienteModel.objects.all()
    
auth_schema = graphene.Schema(query=Query,mutation=Mutation)