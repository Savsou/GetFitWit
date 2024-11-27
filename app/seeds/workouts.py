from app.models import db, Workout, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workouts():

    workouts_data = [
        {
            'dayId': 1,
            'exercise': 'Push-ups',
            'sets': 3,
            'reps': 12,
            'duration': None,
            'weight': None,
        },
        {
            'dayId': 1,
            'exercise': 'Dumbbell Bench Press',
            'sets': 4,
            'reps': 8,
            'duration': None,
            'weight': 50,
        },
        {
            'dayId': 2,
            'exercise': 'Squats',
            'sets': 4,
            'reps': 10,
            'duration': None,
            'weight': 100,
        },
    ]

    workouts = [Workout(**data) for data in workouts_data]
    db.session.add_all(workouts)
    db.session.commit()


def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts"))

    db.session.commit()
