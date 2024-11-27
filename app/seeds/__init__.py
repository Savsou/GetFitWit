from flask.cli import AppGroup
from .users import seed_users, undo_users
from .workout_programs import seed_workout_programs, undo_workout_programs
from .weeks import seed_weeks, undo_weeks
from .days import seed_days, undo_days
from .workouts import seed_workouts, undo_workouts
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_workout_programs()
        undo_weeks()
        undo_days()
        undo_workouts()
        undo_favorites()
    seed_users()
    seed_workout_programs()
    seed_weeks()
    seed_days()
    seed_workouts()
    seed_favorites()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_workout_programs()
    undo_weeks()
    undo_days()
    undo_workouts()
    undo_favorites()
