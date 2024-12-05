from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import WorkoutProgram, db, User
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3, update_file_on_s3

workout_program_routes = Blueprint('workout_programs', __name__)


#Get ALL workout programs
@workout_program_routes.route('/')
def all_workout_programs():
    workoutPrograms = WorkoutProgram.query.all()

    return {'workout_programs': [program.to_dict() for program in workoutPrograms]}


#Get workout program by id
@workout_program_routes.route('/<int:workout_program_id>')
def workout_program_by_id(workout_program_id):
    workoutProgram = WorkoutProgram.query.get(workout_program_id)

    if workoutProgram:
        return jsonify(workoutProgram.to_dict()), 200

    return jsonify({"message": "Workout Program not found"}), 400


#Get workout program by difficulty
@workout_program_routes.route('/difficulties')
def get_workout_programs():
    difficulty = request.args.get('difficulty')
    page = int(request.args.get('page', 1))
    #per_page is limit, Flask-SQLAlchemy uses this to paginate
    per_page = int(request.args.get('per_page', 4))

    print(f"Received difficulty: {difficulty}, page: {page}, per_page: {per_page}")

    if difficulty not in ['Beginner', 'Intermediate', 'Advanced']:
        return jsonify({"message": "Invalid difficulty level"}), 400

    query = WorkoutProgram.query.filter_by(difficulty=difficulty).paginate(page=page, per_page=per_page, error_out=False)

    workout_programs = [program.to_dict() for program in query.items]
    total_pages = query.pages

    return jsonify({
        'workout_programs': workout_programs,
        'total_pages': total_pages
    })


#Create A Workout Program
