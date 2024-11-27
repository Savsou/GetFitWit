from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Week(db.Model):
    __tablename__ = 'weeks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    workoutProgramId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workout_programs.id")), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    # Relationships
    days = db.relationship("Day", backref="week", cascade="all, delete")
    # workouts = db.relationship("Workout", backref="week", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'workoutProgramId': self.workoutProgramId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'days': [day.to_dict() for day in self.days],
            # 'workouts': [workout.to_dict() for workout in self.workouts],
        }
