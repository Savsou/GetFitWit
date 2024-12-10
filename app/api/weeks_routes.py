from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import WorkoutProgram, db, User, Week

weeks_routes = Blueprint('weeks', __name__)


#Create A New Week for a Workout Program
@weeks_routes.route('/', methods=['POST'])
@login_required
def create_week():
    data = request.get_json()
    workout_program_id = data.get('workoutProgramId')

    workoutProgram = WorkoutProgram.query.get(workout_program_id)

    if not workoutProgram:
        return {'message': 'Workout Program not found!'}, 404

    if workoutProgram.userId != current_user.id:
        return {'message': 'Unauthorized to add new week'}

    new_week = Week(workoutProgramId=workout_program_id)

    db.session.add(new_week)
    db.session.commit()
    new_week.create_days()

    return new_week.to_dict(), 201


#Delete A Week of a Workout Program
@weeks_routes.route('/<int:week_id>', methods=['DELETE'])
@login_required
def delete_week(week_id):
    week = Week.query.get(week_id)

    if not week:
        return {'message': 'Week not found!'}, 404

    workoutProgram = WorkoutProgram.query.get(week.workoutProgramId)
    if workoutProgram.userId != current_user.id:
        return {'message': 'Unauthorized to delete the week!'}, 403

    db.session.delete(week)
    db.session.commit()

    return {'message': 'Successfully deleted the week'}, 200
