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

    # Create the days of the week for each week
    for week in weeks:
        week.create_days()


def undo_weeks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.weeks RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.days RESTART IDENTITY CASCADE;")
    else:
        # Remove days, work like a tree and remove the ends first
        db.session.execute(text("DELETE FROM days"))
        db.session.execute(text("DELETE FROM weeks"))

    db.session.commit()
