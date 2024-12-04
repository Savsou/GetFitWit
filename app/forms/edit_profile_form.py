from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Optional
from app.aws_helpers import ALLOWED_EXTENSIONS

class EditProfileForm(FlaskForm):
    bio = TextAreaField('bio', validators=[Optional()])
    profileImageUrl = FileField('profileImage', validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField('Update Profile')
