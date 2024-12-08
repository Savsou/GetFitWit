from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, Optional, ValidationError
from app.aws_helpers import ALLOWED_EXTENSIONS

WORKOUT_TYPES = [
    ('full_body', 'Full Body'),
    ('cardio', 'Cardio'),
    ('strength', 'Strength'),
    ('abs', 'Abs'),
    ('chest', 'Chest'),
    ('arms', 'Arms'),
    ('legs', 'Legs'),
    ('back', 'Back'),
    ('shoulders', 'Shoulders'),
]

EQUIPMENT_CHOICES = [
    ('none', 'None'),
    ('dumbbells', 'Dumbbells'),
    ('mat', 'Mat'),
    ('barbell', 'Barbell'),
    ('kettlebell', 'Kettlebell'),
    ('resistance_band', 'Resistance Band'),
    ('bench', 'Bench'),
]

DIFFICULTY_CHOICES = [
    ('', 'Select Difficulty'),
    ('beginner', 'Beginner'),
    ('intermediate', 'Intermediate'),
    ('advanced', 'Advanced'),
]

#If a selectfield is not picked, the placeholder counts as a valid Data.
def validate_choice(form, field):
    if field.data == '':
        raise ValidationError('Please select a choice.')

class WorkoutProgramForm(FlaskForm):
    programName = StringField('programName', validators=[DataRequired(message="Enter a name for the workout program.")])
    difficulty = SelectField('difficulty', choices=DIFFICULTY_CHOICES, validators=[DataRequired(), validate_choice])
    types = SelectMultipleField(
        'types',
        choices=WORKOUT_TYPES,
        validators=[DataRequired(message="Please select at least one workout type.")]
    )
    equipments = SelectMultipleField(
        'equipments',
        choices=EQUIPMENT_CHOICES,
        validators=[DataRequired(message="Please select at least one equipment.")]
    )
    description = TextAreaField('description', validators=[Optional()])
    workoutImageUrl = FileField('workoutImageUrl', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Create Workout Program')
