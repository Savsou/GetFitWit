from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Day, db

days_routes = Blueprint('days', __name__)


#Get A Day by id
@days_routes.route('/<int:day_id>')
def get_a_day(day_id):
    day = Day.query.get(day_id)

    if not day:
        return {'message': 'Day not found!'}, 404

    return jsonify(day.to_dict()), 200


#Update A Day of a Workout Program
@days_routes.route('/<int:day_id>/rest', methods=['PUT'])
@login_required
def toggle_rest_day(day_id):
    day = Day.query.get(day_id)

    if not day:
        return {'message': 'Day not found!'}, 404

    day.restDay = not day.restDay

    db.session.commit()

    return jsonify(day.to_dict()), 200


#Get All Workouts by Specific Day
@days_routes.route('/<int:day_id>/workouts')
def workouts_by_day(day_id):
    day = Day.query.get(day_id)

    if not day:
        return {'message': 'Day not found!'}, 404

    workouts = day.workouts

    return {'workouts': [workout.to_dict() for workout in workouts]}, 200
