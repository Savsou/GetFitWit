from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .day import Day


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

    def create_days(self):
        # Create all days for the week with specified rest days.
        days_of_week = [
            {'name': 'Sunday', 'restDay': True},
            {'name': 'Monday', 'restDay': False},
            {'name': 'Tuesday', 'restDay': False},
            {'name': 'Wednesday', 'restDay': False},
            {'name': 'Thursday', 'restDay': False},
            {'name': 'Friday', 'restDay': False},
            {'name': 'Saturday', 'restDay': True},
        ]

        for day_data in days_of_week:
            new_day = Day(name=day_data['name'], restDay=day_data['restDay'], weekId=self.id)
            db.session.add(new_day)

        db.session.commit()

    def get_days(self):
        return Day.query.filter_by(weekId=self.id).order_by(
            db.case(
                {"Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6},
                value=Day.name
            )
        ).all()

    def to_dict(self):
        return {
            'id': self.id,
            'workoutProgramId': self.workoutProgramId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'days': [day.to_dict() for day in self.get_days()],
            # 'workouts': [workout.to_dict() for workout in self.workouts],
        }
