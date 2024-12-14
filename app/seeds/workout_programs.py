from app.models import db, WorkoutProgram, environment, SCHEMA
from sqlalchemy.sql import text

def seed_workout_programs():

    workout_programs_data = [
        {
            'userId': 1,
            'programName': 'Strength Builder 1',
            'difficulty': 'intermediate',
            'types': ['strength'],
            'equipments': ['dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A 4-week strength building program.',
        },
        {
            'userId': 2,
            'programName': 'Cardio Burn 1',
            'difficulty': 'beginner',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'High-intensity cardio program for beginners.',
        },
        {
            'userId': 3,
            'programName': 'Abs and Core 1',
            'difficulty': 'advanced',
            'types': ['abs'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Advanced core training for strong abs.',
        },
        {
            'userId': 4,
            'programName': 'Leg Day 1',
            'difficulty': 'intermediate',
            'types': ['legs'],
            'equipments': ['barbell', 'dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'An intermediate program focused on leg strength.',
        },
        {
            'userId': 5,
            'programName': 'HIIT Challenge',
            'difficulty': 'advanced',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A 2-week high-intensity interval challenge.',
        },
        {
            'userId': 6,
            'programName': 'Flexibility Focus',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A program to improve flexibility and mobility.',
        },
        {
            'userId': 7,
            'programName': 'Endurance Training',
            'difficulty': 'intermediate',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A 6-week endurance training program.',
        },
        {
            'userId': 8,
            'programName': 'Muscle Gain',
            'difficulty': 'advanced',
            'types': ['strength'],
            'equipments': ['dumbbells', 'barbell'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A program focused on muscle hypertrophy.',
        },
        {
            'userId': 9,
            'programName': 'Yoga Basics',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Basic yoga postures and breathing techniques.',
        },
        {
            'userId': 10,
            'programName': 'Powerlifting Prep',
            'difficulty': 'advanced',
            'types': ['strength'],
            'equipments': ['barbell', 'bench'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A prep program for powerlifting competitions.',
        },
        {
            'userId': 11,
            'programName': 'Bodyweight Workout',
            'difficulty': 'intermediate',
            'types': ['strength'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Full-body workouts using only bodyweight.',
        },
        {
            'userId': 12,
            'programName': 'Quick HIIT',
            'difficulty': 'beginner',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Quick and intense HIIT sessions for fat loss.',
        },
        {
            'userId': 13,
            'programName': 'Pilates Core',
            'difficulty': 'intermediate',
            'types': ['abs'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Core-focused pilates exercises.',
        },
        {
            'userId': 14,
            'programName': 'Functional Fitness',
            'difficulty': 'advanced',
            'types': ['full_body'],
            'equipments': ['kettlebell', 'resistance_band'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Functional movements for everyday strength.',
        },
        {
            'userId': 15,
            'programName': 'Chest and Shoulders',
            'difficulty': 'intermediate',
            'types': ['chest', 'shoulders'],
            'equipments': ['barbell', 'bench'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Intermediate program focused on chest and shoulders.',
        },
        {
            'userId': 16,
            'programName': 'Weight Loss Journey',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A holistic approach to weight loss.',
        },
        {
            'userId': 17,
            'programName': 'Metabolic Conditioning',
            'difficulty': 'advanced',
            'types': ['full_body'],
            'equipments': ['dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Intense workouts to boost metabolism.',
        },
        {
            'userId': 18,
            'programName': 'CrossFit Foundations',
            'difficulty': 'intermediate',
            'types': ['full_body'],
            'equipments': ['barbell', 'kettlebell'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'Introduction to CrossFit methodologies.',
        },
        {
            'userId': 19,
            'programName': 'Boot Camp',
            'difficulty': 'advanced',
            'types': ['full_body', 'cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'A military-style boot camp program.',
        },
        {
            'userId': 20,
            'programName': 'Beginner Lifting',
            'difficulty': 'beginner',
            'types': ['strength'],
            'equipments': ['dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455470/msenyti81yrutkkwpnrz.jpg',
            'description': 'An introductory lifting program for beginners.',
        },
    ]

    workout_programs = [WorkoutProgram(**data) for data in workout_programs_data]
    db.session.add_all(workout_programs)
    db.session.commit()


def undo_workout_programs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.workout_programs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM workout_programs"))

    db.session.commit()
