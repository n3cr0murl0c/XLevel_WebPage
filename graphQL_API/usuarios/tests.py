from django.test import TestCase

from model_bakery import baker
from usuarios.models import Cliente
# Create your tests here.

class ClienteTestModel(TestCase):
    """
    Class to test the model cliente
    """

    def setUp(self):
        self.cliente = baker.make(Cliente)
        self.direcciones = baker.make('store.Direcciones')

        

            # 1st form: app_label.model_name
            # order = baker.make('store.Order')

            # # 2nd form: model_name
            # product = baker.make('Product')