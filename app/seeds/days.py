from app.models import db, Day, environment, SCHEMA
from sqlalchemy.sql import text

def seed_days():

    days_data = [
        {
            'weekId': 1,
            'name': 'Day 1 - Upper Body',
            'restDay': False,
        },
        {
            'weekId': 1,
            'name': 'Day 2 - Lower Body',
            'restDay': False,
        },
        {
            'weekId': 2,
            'name': 'Day 1 - Cardio',
            'restDay': False,
        },

    ]

    days = [Day(**data) for data in days_data]
    db.session.add_all(days)
    db.session.commit()


def undo_days():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.days RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM days"))

    db.session.commit()
