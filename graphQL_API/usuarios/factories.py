import factory
from factory.django import DjangoModelFactory

from .models import Cliente, Direccion, Telefono

fake = factory.Faker()
factory.Faker.seed(0)
# Defining a factory
class ClienteFactory(DjangoModelFactory):
    class Meta:
        model = Cliente
    
    firstName = factory.Faker("first_name")
    lastName = factory.Faker('last_name')
    email = factory.Faker('email')
    username = factory.Faker('username')
    sexo = factory.Faker('random_choices', elements=Cliente.Sexo.choices)
    genero = factory.Faker('random_choices',elements=Cliente.Genero.choices)

class DireccionFactory(DjangoModelFactory):
    class Meta:
        model= Direccion
    cliente = factory.SubFactory(ClienteFactory)
    nro_casa = factory.Faker('building_number')
    ciudad = factory.Faker('city')
    pais = factory.Faker('country')
    calle_principal = factory.Faker('street_name')
    calle_secundaria = factory.Faker('street_name')
    

