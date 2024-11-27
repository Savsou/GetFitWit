from app.models import db, Week, environment, SCHEMA
from sqlalchemy.sql import text

def seed_weeks():

    weeks_data = [
        {
            'workoutProgramId': 1,
        },
        {
            'workoutProgramId': 2,
        },
        {
            'workoutProgramId': 3,
        },
    ]

    weeks = [Week(**data) for data in weeks_data]
    db.session.add_all(weeks)
    db.session.commit()


def undo_weeks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.weeks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM weeks"))

    db.session.commit()
