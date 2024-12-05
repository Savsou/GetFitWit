from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class WorkoutProgram(db.Model):
    __tablename__ = 'workout_programs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    programName = db.Column(db.String(100), nullable=False)
    difficulty = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    equipment = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String)
    workoutImageUrl = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    #Relationships
    weeks = db.relationship("Week", backref="workout_program", cascade="all, delete")
    # days = db.relationship("Day", backref="workout_program", cascade="all, delete")
    # workouts = db.relationship("Workout", backref="workout_program", cascade="all, delete")

    def get_all_days(self):
        all_days = [];

        for week in self.weeks:
            all_days.extend(week.days)
        return all_days

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'programName': self.programName,
            'difficulty': self.difficulty,
            'type': self.type,
            'equipment': self.equipment,
            'description': self.description,
            'workoutImageUrl': self.workoutImageUrl,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'weeks': [week.to_dict() for week in self.weeks],
            # 'days': [day.to_dict() for day in self.days],
            # 'days': [day.to_dict() for day in self.get_all_days()],
            # 'workouts': [workout.to_dict() for workout in self.workouts],
        }
