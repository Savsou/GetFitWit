# **Database Schema**

![getfitwit-database-schema](GetFitWitSchema.png)

## `User`

| column name     | data type | details               |
| --------------- | --------- | --------------------- |
| id              | integer   | not null, primary key |
| email           | string    | not null, unique      |
| username        | string    | not null, unique      |
| bio             | string    |                       |
| hashedPassword  | string    | not null, unique      |
| profileImageUrl | string    |                       |
| createdAt       | datetime  | not null              |
| updatedAt       | datetime  | not null              |

workout_programs = db.relationship("WorkoutProgram", backref="user", cascade="all, delete")

favorites = db.relationship('Favorite', backref='user', cascade="all, delete")

## `WorkoutProgram`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| programName | string    | not null              |
| difficulty  | string    | not null              |
| type        | string    | not null              |
| equipment   | string    | not null              |
| description | string    |                       |
| imageUrl    | string    |                       |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

userId references users table.

weeks = db.relationship("Week", backref="workout_program", cascade="all, delete")

favorites = db.relationship('Favorite', secondary=favorite_programs, backref='favorite_list', cascade='all, delete')

## `Week`

| column name      | data type | details               |
| ---------------- | --------- | --------------------- |
| id               | integer   | not null, primary key |
| workoutProgramId | integer   | not null, foreign key |
| createdAt        | datetime  | not null              |
| updatedAt        | datetime  | not null              |

days = db.relationship("Day", backref="week", cascade="all, delete")

## `Day`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| weekId      | integer   | not null, foreign key |
| name        | string    | not null              |
| restDay     | boolean   | default false         |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

workouts = db.relationship("Workout", backref="week", cascade="all, delete")

## `Workout`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| dayId       | integer   | not null, foreign key |
| exercise    | string    | not null              |
| sets        | integer   |                       |
| reps        | integer   |                       |
| duration    | integer   |                       |
| weight      | integer   |                       |
| createdAt   | datetime  | not null              |
| updatedAt   | datetime  | not null              |

## `Favorite`

| column name | data type | details               |
| ----------- | --------- | --------------------- |
| id          | integer   | not null, primary key |
| userId      | integer   | not null, foreign key |
| createdAt   | datetime  | not null              |

workoutPrograms = db.relationship('WorkoutProgram', secondary=favorite_programs, backref="favorite_list")

## `favorite_programs`

| column name      | data type | details                                 |
| ---------------- | --------- | --------------------------------------- |
| favoriteId       | integer   | not null, foreign key, primary_key=True |
| workoutProgramId | integer   | not null, foreign key, primary_key=True |
| createdAt        | datetime  | not null                                |
