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
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352593/GetFitWit/akwz3wscbhsw1sn9fd9z.jpg',
            'description': 'A 4-week strength building program.',
        },
        {
            'userId': 2,
            'programName': 'Cardio Burn 1',
            'difficulty': 'beginner',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352591/GetFitWit/nz9rauokldqzllejchea.jpg',
            'description': 'High-intensity cardio program for beginners.',
        },
        {
            'userId': 3,
            'programName': 'Abs and Core 1',
            'difficulty': 'advanced',
            'types': ['abs'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352591/GetFitWit/pm9sqyu0mquu1gsd2uwf.jpg',
            'description': 'Advanced core training for strong abs.',
        },
        {
            'userId': 4,
            'programName': 'Leg Day 1',
            'difficulty': 'intermediate',
            'types': ['legs'],
            'equipments': ['barbell', 'dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352592/GetFitWit/d2vcrmtzzbhceifro57h.jpg',
            'description': 'An intermediate program focused on leg strength.',
        },
        {
            'userId': 5,
            'programName': 'HIIT Challenge',
            'difficulty': 'advanced',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352593/GetFitWit/fl3e4hwkipkhvhlbzdsg.jpg',
            'description': 'A 2-week high-intensity interval challenge.',
        },
        {
            'userId': 6,
            'programName': 'Flexibility Focus',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352592/GetFitWit/gouddhchabqnypg8kves.jpg',
            'description': 'A program to improve flexibility and mobility.',
        },
        {
            'userId': 7,
            'programName': 'Endurance Training',
            'difficulty': 'intermediate',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352598/GetFitWit/fbfvr7rybw9z8mwarqit.jpg',
            'description': 'A 6-week endurance training program.',
        },
        {
            'userId': 8,
            'programName': 'Muscle Gain',
            'difficulty': 'advanced',
            'types': ['strength'],
            'equipments': ['dumbbells', 'barbell'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352598/GetFitWit/l35roy4k0n5mjd8pjwhb.jpg',
            'description': 'A program focused on muscle hypertrophy.',
        },
        {
            'userId': 9,
            'programName': 'Yoga Basics',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352597/GetFitWit/crnv0fkpl18cfijs2tsn.jpg',
            'description': 'Basic yoga postures and breathing techniques.',
        },
        {
            'userId': 10,
            'programName': 'Powerlifting Prep',
            'difficulty': 'advanced',
            'types': ['strength'],
            'equipments': ['barbell', 'bench'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352594/GetFitWit/gfuucngtunazb0fkxg3j.jpg',
            'description': 'A prep program for powerlifting competitions.',
        },
        {
            'userId': 11,
            'programName': 'Bodyweight Workout',
            'difficulty': 'intermediate',
            'types': ['strength'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352597/GetFitWit/tj0r965df5zyu337bw7j.jpg',
            'description': 'Full-body workouts using only bodyweight.',
        },
        {
            'userId': 12,
            'programName': 'Quick HIIT',
            'difficulty': 'beginner',
            'types': ['cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352589/GetFitWit/cswmagopxqolvnkyffi5.jpg',
            'description': 'Quick and intense HIIT sessions for fat loss.',
        },
        {
            'userId': 13,
            'programName': 'Pilates Core',
            'difficulty': 'intermediate',
            'types': ['abs'],
            'equipments': ['mat'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352591/GetFitWit/mf7ak31w71s66d1mwn63.jpg',
            'description': 'Core-focused pilates exercises.',
        },
        {
            'userId': 14,
            'programName': 'Functional Fitness',
            'difficulty': 'advanced',
            'types': ['full_body'],
            'equipments': ['kettlebell', 'resistance_band'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352594/GetFitWit/qdro5usmkrkwf0mjslk3.jpg',
            'description': 'Functional movements for everyday strength.',
        },
        {
            'userId': 15,
            'programName': 'Chest and Shoulders',
            'difficulty': 'intermediate',
            'types': ['chest', 'shoulders'],
            'equipments': ['barbell', 'bench'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352591/GetFitWit/qzoopnsusxpnhxwuzivr.jpg',
            'description': 'Intermediate program focused on chest and shoulders.',
        },
        {
            'userId': 16,
            'programName': 'Weight Loss Journey',
            'difficulty': 'beginner',
            'types': ['full_body'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352594/GetFitWit/qtfk0scgacvzobogqrjg.jpg',
            'description': 'A holistic approach to weight loss.',
        },
        {
            'userId': 17,
            'programName': 'Metabolic Conditioning',
            'difficulty': 'advanced',
            'types': ['full_body'],
            'equipments': ['dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352597/GetFitWit/e0zglnggdsjzsptvak9z.jpg',
            'description': 'Intense workouts to boost metabolism.',
        },
        {
            'userId': 18,
            'programName': 'CrossFit Foundations',
            'difficulty': 'intermediate',
            'types': ['full_body'],
            'equipments': ['barbell', 'kettlebell'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352597/GetFitWit/hfgzhsxbg8b6unsbds9r.jpg',
            'description': 'Introduction to CrossFit methodologies.',
        },
        {
            'userId': 19,
            'programName': 'Boot Camp',
            'difficulty': 'advanced',
            'types': ['full_body', 'cardio'],
            'equipments': ['none'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352593/GetFitWit/zg4o6akceez8rchbinrn.jpg',
            'description': 'A military-style boot camp program.',
        },
        {
            'userId': 20,
            'programName': 'Beginner Lifting',
            'difficulty': 'beginner',
            'types': ['strength'],
            'equipments': ['dumbbells'],
            'workoutImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735352590/GetFitWit/u8uqswk3v6gdyrmad8r5.jpg',
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
