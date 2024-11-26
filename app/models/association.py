from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


# Join table for favorites and workout programs
favorites_programs = db.Table(
    'favorite_programs',
    db.Column('favoriteId', db.Integer, db.ForeignKey(add_prefix_for_prod('favorites.id')), primary_key=True),
    db.Column('workoutProgramId', db.Integer, db.ForeignKey(add_prefix_for_prod('workout_programs.id')), primary_key=True),
    db.Column('createdAt', db.DateTime, default=datetime.now, nullable=False)
)

if environment == "production":
    favorites_programs.schema = SCHEMA
