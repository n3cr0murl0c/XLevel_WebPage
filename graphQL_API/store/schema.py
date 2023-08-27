import graphene
from graphene import relay, ObjectType
from graphene_django import DjangoObjectType

from store.models import Order as OrderModel
from store.models import Producto as ProductoModel
from usuarios.schema import Cliente, Direccion, Telefono, BaseUserType
from usuarios.models import BaseUser
from usuarios.models import Direccion as DireccionModel
from usuarios.models import Telefono as TelefonosModel
from usuarios.models import Cliente as ClienteModel

class EstadodeOrdenNode(DjangoObjectType):
    class Meta:
        model = OrderModel
        filter_fields = ['estado']
        interfaces = (relay.Node, )

class Order(DjangoObjectType):
    class Meta:
        model = OrderModel
        fields ="__all__"
        interfaces = (relay.Node, )


class Producto(DjangoObjectType):
    class Meta:
        model=ProductoModel
        fields ="__all__"
    def resolve_telefono(self, cliente):
        return ProductoModel.objects.all()
    

class ClienteInput(graphene.InputObjectType):
    # nombre = graphene.String()
    id= graphene.ID()
    def resolve_ClienteInput(self,info, request):
        return ClienteModel.objects.get(pk=self.id)

class DireccionInput(graphene.InputObjectType):
    cliente_id = graphene.ID()
    id = graphene.ID()
    
class CreateOrder(graphene.Mutation):
    class Meta:
        model = OrderModel
    # createdAt = graphene.DateTime()
   
    #the class attributes define the response of the mutation
    createdBy = graphene.Field(BaseUserType)
    orden = graphene.Field(Order)
    direccion_de_envio = graphene.Field(Direccion)

    class Arguments:# The input arguments for this mutation
    
        # createdBy = graphene.Argument(ClienteInput)
        # productos_solicitados = graphene.Argument()
        total_de_orden = graphene.Float()
        
        estado = graphene.String()
    
    @classmethod
    def mutate(cls,root,info,
               total_de_orden,
               estado):
        user = info.context.user or None
        print(info.context.body)
        ordenNew=OrderModel.objects.create(
            
           createdBy = ClienteModel.objects.get(pk=user.id),
           total_de_orden = total_de_orden,
        #    direccion_de_envio
           estado = estado,
        )
        return CreateOrder(orden=ordenNew)

###########################################################
class Query(graphene.ObjectType):
    clientes = graphene.List(Cliente)
    ordenes = graphene.List(Order)
    direciones = graphene.List(Direccion)
    telefonos = graphene.List(Telefono)
    productos = graphene.List(Producto)
    #Response to logged in
    me = graphene.Field(BaseUserType)

    def resolve_me(self, info):
        """
        metodo que retorna informacion del usuario que envia el token en el header del request.
        """
        print('respuesta en resolve_me')
        user = info.context.user
        print(user)
        if user.is_anonymous:
            raise Exception('Not Logged IN!')
        
        return user
    

    def resolve_productos(self, info):
        return ProductoModel.objects.all()
    def resolve_direcciones(self,info):
        return DireccionModel.objects.all()
    def resolve_clientes(self,info):
        return ClienteModel.objects.all()
    def resolve_ordenes(self,info):
        return OrderModel.objects.all()
    

class Mutation(graphene.ObjectType):
    createOrder= CreateOrder.Field()

schema = graphene.Schema(query=Query,mutation=Mutation)