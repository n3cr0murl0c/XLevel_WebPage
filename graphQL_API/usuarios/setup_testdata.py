# setup_test_data.py
import random

from django.db import transaction
from django.core.management.base import BaseCommand

from usuarios.models import User, Thread, Club, Comment
from usuarios.factories import (
    ClienteFactory,
    DireccionFactory
)

NUM_USERS = 50
NUM_DIRS = 3
NUM_THREADS = 12
COMMENTS_PER_THREAD = 25
USERS_PER_CLUB = 8

class Command(BaseCommand):
    help = "Generates test data"

    @transaction.atomic
    def handle(self, *args, **kwargs):
        self.stdout.write("Deleting old data...")
        models = [ClienteFactory,DireccionFactory]
        for m in models:
            m.objects.all().delete()

        self.stdout.write("Creating new data...")
        # Create all the users
        people = []
        for _ in range(NUM_USERS):
            person = ClienteFactory()
            people.append(person)

        # # Add some users to clubs
        # for _ in range(NUM_CLUBS):
        #     club = ClubFactory()
        #     members = random.choices(
        #         people,
        #         k=USERS_PER_CLUB
        #     )
        #     club.user.add(*members)

        # Create all the direcciones
        
        for _ in range(NUM_DIRS):
            creator = random.choice(people)
            direcion = DireccionFactory(cliente=creator)
            # Create comments for each thread
            direcion.append()