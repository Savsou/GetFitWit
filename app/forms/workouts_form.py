from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError

class WorkoutsForm(FlaskForm):
    def validate_sets(form, field):
        if form.workout_type.data == 'sets_reps' and (field.data is None or field.data <= 0):
            raise ValidationError('Sets are required for sets/reps workout and cannot be less than 0.')

    def validate_reps(form, field):
        if form.workout_type.data == 'sets_reps' and (field.data is None or field.data <= 0):
            raise ValidationError('Reps are required for sets/reps workout and cannot be less than 0.')

    def validate_duration(form, field):
        if form.workout_type.data == 'duration' and (field.data is None or field.data <= 0):
            raise ValidationError('Duration is required for duration workout and cannot be less than 0.')

    def validate_weight(form, field):
        if field.data < 0:
            raise ValidationError('Weight cannot be less than 0.')

    workout_type = SelectField('Workout Type', choices=[('sets_reps', 'Sets/Reps'), ('duration', 'Duration')], validators=[DataRequired()])
    dayId = IntegerField('Day ID', validators=[DataRequired()])
    exercise = StringField('Exercise', validators=[DataRequired()])
    sets = IntegerField('Sets', validators=[validate_sets], default=0)
    reps = IntegerField('Reps', validators=[validate_reps], default=0)
    duration = IntegerField('Duration', validators=[validate_duration], default=0)
    weight = IntegerField('Weight', validators=[validate_weight], default=0)
