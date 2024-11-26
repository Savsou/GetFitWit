from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .association import favorites_programs


class Favorite(db.Model):
    __tablename__ = 'favorites'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)

    # Relationships
    workoutPrograms = db.relationship('WorkoutProgram', secondary=favorites_programs, backref="favorite_list")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'workoutPrograms': [program.to_dict() for program in self.workoutPrograms],
        }
