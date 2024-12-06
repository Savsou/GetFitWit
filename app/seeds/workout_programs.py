from app.models import db, WorkoutProgram, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workout_programs():

    workout_programs_data = [
        {
            'userId': 1,
            'programName': 'Strength Builder 1',
            'difficulty': 'intermediate',
            'types': ['strength'],
            'equipments': ['dumbbells'],
            'description': 'A 4-week strength building program.',
        },
        {
            'userId': 2,
            'programName': 'Cardio Burn 1',
            'difficulty': 'beginner',
            'types': ['cardio'],
            'equipments': ['none'],
            'description': 'High-intensity cardio program for beginners.',
        },
        {
            'userId': 3,
            'programName': 'Strength Builder 2',
            'difficulty': 'advanced',
            'types': ['strength'],
            'equipments': ['barbell'],
            'description': 'Advanced strength training with heavy lifts.',
        },
        {
            'userId': 4,
            'programName': 'Cardio Burn 2',
            'difficulty': 'intermediate',
            'types': ['cardio'],
            'equipments': ['none'],
            'description': 'Intermediate cardio for endurance improvement.',
        },
        {
            'userId': 5,
            'programName': 'HIIT Challenge',
            'difficulty': 'advanced',
            'types': ['cardio'],
            'equipments': ['none'],
            'description': 'A 2-week high-intensity interval challenge.',
        },
    ]

    workout_programs = [WorkoutProgram(**data) for data in workout_programs_data]
    db.session.add_all(workout_programs)
    db.session.commit()


def undo_workout_programs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workout_programs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workout_programs"))

    db.session.commit()
