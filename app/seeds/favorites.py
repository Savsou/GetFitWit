from app.models import db, Favorite, favorites_programs, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():

    favorites_data = [
        {'userId': 1},
        {'userId': 2},
        {'userId': 3},
    ]

    db.session.bulk_insert_mappings(Favorite, favorites_data)
    db.session.commit()

    favorite_program_data = [
        {'favoriteId': 1, 'workoutProgramId': 1},
        {'favoriteId': 1, 'workoutProgramId': 2},
        {'favoriteId': 2, 'workoutProgramId': 3},
    ]

    for association in favorite_program_data:
        db.session.execute(
            favorites_programs.insert().values(**association)
        )

    db.session.commit()


def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_programs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
        db.session.execute(text("DELETE FROM favorite_programs"))

    db.session.commit()
