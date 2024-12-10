from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import WorkoutProgram, db, User
from app.forms import WorkoutProgramForm
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

    if difficulty not in ['beginner', 'intermediate', 'advanced']:
        return jsonify({"message": "Invalid difficulty level"}), 400

    query = WorkoutProgram.query.filter_by(difficulty=difficulty).paginate(page=page, per_page=per_page, error_out=False)

    workout_programs = [program.to_dict() for program in query.items]
    total_pages = query.pages

    return jsonify({
        'workout_programs': workout_programs,
        'total_pages': total_pages
    })


#Get current user's workout programs
@workout_program_routes.route('/current')
@login_required
def current_workout_programs():
    user = current_user.to_dict()
    return {"workout_programs": user["workoutPrograms"]}


#Create A Workout Program
@workout_program_routes.route('/')
@login_required
def create_workout_program():
    form = WorkoutProgramForm()

    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        image = form.workoutImageUrl.data
        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {"error": upload["errors"]}, 400
            url = upload["url"]
        else:
            #Can change to default image later
            url = "https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg"

        newWorkoutProgram = WorkoutProgram(
            userId=current_user.id,
            programName=form.programName.data,
            difficulty=form.difficulty.data,
            types=form.types.data,
            equipments=form.equipments.data,
            description=form.description.data,
            workoutImageUrl=url
        )

        db.session.add(newWorkoutProgram)
        db.session.commit()
        return newWorkoutProgram.to_dict(), 201

    if form.errors:
        return form.errors, 400


#Delete A Workout Program
@workout_program_routes.route('/<int:workout_program_id>', methods=['DELETE'])
@login_required
def delete_workout_program(workout_program_id):
    workoutProgram = WorkoutProgram.query.get(workout_program_id)

    if not workoutProgram:
        return {"messasge": "Workout Program not found!"}, 404

    #make sure only the user can delete the program
    if workoutProgram.userId != current_user.id:
        return {"message": "You do not have permission to delete this program."}, 403

    #Delete the workout image url from aws
    image_url = workoutProgram.workoutImageUrl

    if image_url:
        remove_file_from_s3(image_url)

    db.session.delete(workoutProgram)
    db.session.commit()
    return {"message": "Workout Program has been deleted."}


#Update A Workout Program
@workout_program_routes.route('/<int:workout_program_id>', methods=['PUT'])
@login_required
def update_workout_program(workout_program_id):
    workoutProgram = WorkoutProgram.query.get(workout_program_id)

    if not workoutProgram:
        return {"messasge": "Workout Program not found!"}, 404

    #make sure only the user can delete the program
    if workoutProgram.userId != current_user.id:
        return {"message": "You do not have permission to delete this program."}, 403

    form = WorkoutProgramForm()

    form["csrf_token"].data = request.cookies.get("csrf_token")

    if form.validate_on_submit():
        image = form.workoutImageUrl.data

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return {"error": upload["errors"]}, 400
            workoutProgram.workoutImageUrl = upload["url"]

        # Update fields if provided
        workoutProgram.programName = form.programName.data or workoutProgram.programName
        workoutProgram.difficulty = form.difficulty.data or workoutProgram.difficulty
        workoutProgram.types = form.types.data or workoutProgram.types
        workoutProgram.equipments = form.equipments.data or workoutProgram.equipments
        workoutProgram.description = form.description.data or workoutProgram.description

        db.session.commit()
        return workoutProgram.to_dict(), 200

    if form.errors:
        return form.errors, 400
