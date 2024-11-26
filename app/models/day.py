from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Day(db.Model):
    __tablename__ = 'days'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    weekId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("weeks.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    restDay = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    # Relationships
    workouts = db.relationship("Workout", backref="day", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'weekId': self.weekId,
            'name': self.name,
            'restDay': self.restDay,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'workouts': [workout.to_dict() for workout in self.workouts],
        }
