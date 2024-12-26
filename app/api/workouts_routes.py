from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workout, db, User, Week, Day, WorkoutProgram
from app.forms import WorkoutsForm

workouts_routes = Blueprint('workouts', __name__)


#Get A Workout by Id
@workouts_routes.route('/<int:workout_id>')
def get_workout(workout_id):
    workout = Workout.query.get(workout_id)

    if not workout:
        return {'message': 'Workout not found!'}, 404

    return jsonify(workout.to_dict()), 200


# Create A New Workout for a Workout Program
@workouts_routes.route('/', methods=['POST'])
@login_required
def create_workout():
    form = WorkoutsForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        workout_type = form.workout_type.data
        day_id = form.dayId.data
        exercise = form.exercise.data
        sets = form.sets.data or 0
        reps = form.reps.data or 0
        minutes = form.minutes.data or 0
        seconds = form.seconds.data or 0
        weight = form.weight.data or 0

        day = Day.query.get(day_id)
        if not day:
            return {'message': 'Day not found.'}, 404

        week = Week.query.get(day.weekId)
        if not week:
            return {'message': 'Week not found.'}, 404

        workout_program = WorkoutProgram.query.get(week.workoutProgramId)
        if not workout_program:
            return {'message': 'Workout Program not found.'}, 404

        if workout_program.userId != current_user.id:
            return {'message': 'You do not have permission to add a workout to this program.'}, 403

        new_workout = Workout(
            dayId=day_id,
            exercise=exercise,
            workout_type=workout_type,
            sets=sets,
            reps=reps,
            minutes=minutes,
            seconds=seconds,
            weight=weight
        )

        db.session.add(new_workout)
        db.session.commit()
        return jsonify(new_workout.to_dict()), 201

    if form.errors:
        return jsonify(errors=form.errors), 400


#Delete A Workout
@workouts_routes.route('/<int:workout_id>', methods=['DELETE'])
@login_required
def delete_week(workout_id):

    workout = Workout.query.get(workout_id)
    if not workout:
        return {'message': 'Workout not found!'}, 404

    day = Day.query.get(workout.dayId)
    if not day:
        return jsonify({'error': 'Day not found.'}), 404

    week = Week.query.get(day.weekId)
    if not week:
        return jsonify({'error': 'Week not found.'}), 404

    workout_program = WorkoutProgram.query.get(week.workoutProgramId)
    if not workout_program:
        return jsonify({'error': 'Workout Program not found.'}), 404

    if workout_program.userId != current_user.id:
        return jsonify({'error': 'You do not have permission to delete this workout.'}), 403

    db.session.delete(workout)
    db.session.commit()

    return {'message': 'Successfully deleted the workout'}, 200


#Update A Workout
@workouts_routes.route('/<int:workout_id>', methods=['PUT'])
@login_required
def update_workout(workout_id):
    form = WorkoutsForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        workout = Workout.query.get(workout_id)
        if not workout:
            return jsonify({'message': 'Workout not found.'}), 404

        day = Day.query.get(workout.dayId)
        week = Week.query.get(day.weekId)
        workout_program = WorkoutProgram.query.get(week.workoutProgramId)
        if workout_program.userId != current_user.id:
            return jsonify({'message': 'You do not have permission to update this workout.'}), 403

        workout.workout_type = form.workout_type.data
        workout.exercise = form.exercise.data
        workout.sets = form.sets.data if form.sets.data is not None else 0
        workout.reps = form.reps.data if form.reps.data is not None else 0
        workout.minutes = form.minutes.data if form.minutes.data is not None else 0
        workout.seconds = form.seconds.data if form.seconds.data is not None else 0
        workout.weight = form.weight.data if form.weight.data is not None else 0

        db.session.commit()
        return jsonify(workout.to_dict()), 200

    if form.errors:
        return jsonify({"errors": form.errors}), 400
