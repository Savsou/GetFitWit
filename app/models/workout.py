from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Workout(db.Model):
    __tablename__ = 'workouts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    dayId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("days.id")), nullable=False)
    exercise = db.Column(db.String(100), nullable=False)
    sets = db.Column(db.Integer)
    reps = db.Column(db.Integer)
    duration = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'dayId': self.dayId,
            'exercise': self.exercise,
            'sets': self.sets,
            'reps': self.reps,
            'duration': self.duration,
            'weight': self.weight,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
