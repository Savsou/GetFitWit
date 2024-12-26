from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Favorite, db, WorkoutProgram, favorites_programs

favorites_routes = Blueprint('favorites', __name__)


#Get current user's favorite workout programs
@favorites_routes.route('/session')
@login_required
def get_session_user_favorites():
    favorite = current_user.favorites

    result = []

    for program in favorite.workoutPrograms:
        favorite_program = db.session.query(favorites_programs).filter_by(favoriteId=favorite.id, workoutProgramId=program.id).first()

        if favorite_program:
            result.append({
                "id": program.id,
                "programName": program.programName,
                "userId": program.userId,
                "creatorUsername": program.user.username,
                "description": program.description,
                "difficulty": program.difficulty,
                "equipments": program.equipments,
                "types": program.types,
                "workoutImageUrl": program.workoutImageUrl
            })

    return {'favorites': result}, 200

#Add a workout program to current user's favorite
@favorites_routes.route('/session', methods=["POST"])
@login_required
def add_to_favorites():
    data = request.get_json()
    workout_program_id = data.get('workoutProgramId')
    program = WorkoutProgram.query.get(workout_program_id)

    if program:
        favorite_program = db.session.query(favorites_programs).filter_by(favoriteId=current_user.favorites.id, workoutProgramId=workout_program_id).first()

        if favorite_program:
            return {"message": "Workout Program is already in the Favorites"}, 400
        else :
            db.session.execute(
                favorites_programs.insert().values(favoriteId=current_user.favorites.id, workoutProgramId=workout_program_id)
            )
            db.session.commit()

            favorite = current_user.to_dict()["favorites"]

            result = []

            for program in favorite["workoutPrograms"]:
                dict_program = {
                    "id": program["id"],
                    "programName": program["programName"],
                    "userId": program["userId"],
                    "creatorUsername": program["creatorUsername"],
                    "description": program["description"],
                    "difficulty": program["difficulty"],
                    "equipments": program["equipments"],
                    "types": program["types"],
                    "workoutImageUrl": program["workoutImageUrl"]
                }
                result.append(dict_program)

            return {
                "message": "Workout Program added to Favorites",
                "favorites": result
            }
    else:
        return {"message": "Workout program not found"}, 400


#Remove A Workout Program from current user's favorites
@favorites_routes.route('/session/<int:workoutProgramId>', methods=["DELETE"])
@login_required
def delete_from_favorites(workoutProgramId):
    workoutProgram = WorkoutProgram.query.get(workoutProgramId)

    if workoutProgram:
        favorite_program = db.session.query(favorites_programs).filter_by(
            favoriteId=current_user.favorites.id,
            workoutProgramId=workoutProgramId
        ).first()

        if favorite_program:
            db.session.execute(
                favorites_programs.delete().where(
                    favorites_programs.c.favoriteId == current_user.favorites.id,
                    favorites_programs.c.workoutProgramId == workoutProgramId
                )
            )

            db.session.commit()
            return {"message": "Workout Program removed from Favorites"}
        else:
            return {"message": "Workout Program not found in Favorites"}, 404
    else:
        return {"message": "Workout Program not found"}, 404
