from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, HiddenField
from wtforms.validators import DataRequired, ValidationError

class WorkoutsForm(FlaskForm):
    def validate_sets(form, field):
        if form.workout_type.data == 'sets_reps':
            if field.data is None or field.data == '':
                field.data = 0
            if field.data <= 0:
                raise ValidationError('Sets are required for sets/reps workout and cannot be less than 1.')

    def validate_reps(form, field):
        if form.workout_type.data == 'sets_reps':
            if field.data is None or field.data == '':
                field.data = 0
            if field.data <= 0:
                raise ValidationError('Reps are required for sets/reps workout and cannot be less than 0.')

    def validate_minutes(form, field):
        if form.workout_type.data == 'duration':
            if field.data is None or field.data == '':
                field.data = 0
            if field.data < 0:
                raise ValidationError('Duration is required for duration workout and cannot be less than 0.')

    def validate_seconds(form, field):
        if form.workout_type.data == 'duration':
            if field.data is None or field.data == '':
                field.data = 0
            if field.data < 0:
                raise ValidationError('Duration is required for duration workout and cannot be less than 0.')

    def validate_weight(form, field):
        if field.data is None or field.data == '':
            field.data = 0
        if field.data < 0:
            raise ValidationError('Weight cannot be less than 0.')

    dayId = HiddenField('Day ID')

    workout_type = SelectField('Workout Type', choices=[('sets_reps', 'Sets/Reps'), ('duration', 'Duration')], validators=[DataRequired()])
    exercise = StringField('Exercise', validators=[DataRequired(message="Name is required.")])
    sets = IntegerField('Sets', validators=[validate_sets], default=0)
    reps = IntegerField('Reps', validators=[validate_reps], default=0)
    minutes = IntegerField('Minutes', validators=[validate_minutes], default=0)
    seconds = IntegerField('Seconds', validators=[validate_seconds], default=0)
    weight = IntegerField('Weight', validators=[validate_weight], default=0)
