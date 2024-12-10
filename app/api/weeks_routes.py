from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import WorkoutProgram, db, User

weeks_routes = Blueprint('weeks', __name__)
