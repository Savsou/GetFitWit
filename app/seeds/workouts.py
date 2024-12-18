from app.models import db, Workout, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workouts():

    workouts_data = []

    for day_id in range(1, 141):
        workouts_data.append({
            'dayId': day_id,
            'workout_type': 'sets_reps',
            'exercise': 'Push-ups',
            'sets': 3,
            'reps': 12,
            'minutes': 0,
            'seconds': 0,
            'weight': 0,
        })
        workouts_data.append({
            'dayId': day_id,
            'workout_type': 'sets_reps',
            'exercise': 'Dumbbell Bench Press',
            'sets': 4,
            'reps': 8,
            'minutes': 0,
            'seconds': 0,
            'weight': 50,
        })
        workouts_data.append({
            'dayId': day_id,
            'workout_type': 'duration',
            'exercise': 'Plank',
            'sets': 0,
            'reps': 0,
            'minutes': 1,
            'seconds': 30,
            'weight': 0,
        })

    workouts = [Workout(**data) for data in workouts_data]
    db.session.add_all(workouts)
    db.session.commit()


def undo_workouts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workouts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workouts"))

    db.session.commit()
