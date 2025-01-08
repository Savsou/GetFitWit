# GetFitWit

GetFitWit is a workout website that is dedicated to providing users access to other users' workout programs that they have made! Create and share workout programs with others in a user-friendly way that others can follow. The site shows impressive css features such as auto-zoom on hover for workout program cards, dynamic pages and more. With about 2 weeks deadline, it came out better than expected. I hope to make this project be more refined and be the highlight of my resume.

# Live Link

https://getfitwit.onrender.com/

## Tech Stack

### Frameworks and Libraries
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://img.shields.io/badge/-Python-3776ab?logo=python&logoColor=FFFF66&logoWidth=20" alt="Python" height="25">
  <img src="https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white&logoWidth=20" alt="Flask" height="25">
  <img src="https://img.shields.io/badge/-Javascript-41454A?logo=javascript&logoColor=F7DF1E&logoWidth=20" alt="Javascript" height="25">
  <img src="https://img.shields.io/badge/-React-263238?logo=react&logoColor=61DAFB&logoWidth=20" alt="React" height="25">
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&logoWidth=20" alt="Redux" height="25">
  <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&logoWidth=20" alt="CSS3" height="25">
  <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&logoWidth=20" alt="HTML5" height="25">
</div>

### Database:

<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&logoWidth=20" alt="PostgreSQL" height="25">

### Hosting:

<img src="https://img.shields.io/badge/-Render-23c43e?logo=render&logoColor=white&logoWidth=20" alt="Render" height="25">

### Connect With Me:

[<img align="left" alt="savonnasou | LinkedIn" width="22px" src="./readme-logos/linkedin.png" style="margin-right: 10px;" />][linkedin]

[linkedin]: https://www.linkedin.com/in/savannah-sou/

[<img align="left" alt="savonnasou | Gmail" width="22px" src="./readme-logos/gmail.png" style="margin-right: 10px;" />][gmail]

[gmail]: mailto:savonna.sou@gmail.com

<br></br>

# Index

[Feature List](https://github.com/Savsou/GetFitWit/wiki/Features) | [DB Schema](https://github.com/Savsou/GetFitWit/wiki/DB-Schema) | [User Stories](https://github.com/Savsou/GetFitWit/wiki/User-Stories) | [Wireframes](https://github.com/Savsou/GetFitWit/wiki/Wireframes)

# API Routes

## Users

### User Login

Users can log in using their email.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/login
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "username",
      "email": "user@example.com",
      "bio": "example bio here",
      "profileImageUrl": "exampleprofile.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27"
    }
    ```

- **Error Response: Couldn't find user with given credentials**
  - **Status Code**: 404
  - **Body**:

```json
{
  "message": "Login failed. Please check your credentials and try again."
}
```

### User Logout

Users should be able to logout if they are currently logged in

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/auth/logout
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "User logged out"
    }
    ```

### User Signup

Users can create a new account by signing up.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/signup
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "username": "desired_username",
      "password": "your_password",
      "confirm_password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "id": 21,
      "username": "desired_username",
      "email": "user@example.com",
      "bio": "",
      "profileImageUrl": "",
      "createdAt": "2024-11-01 02:12:32",
      "updatedAt": "2024-11-01 02:12:32",
      "workoutPrograms": []
    }
    ```

- **Error Response: User already exists**
  - **Status Code**: 409
  - **Body**:
    ```json
    {
      "message": "Username or email already exists."
    }
    ```

### User Delete

Users can delete their account.

- **Require authentication**: True
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/users/session
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "User deleted successfully."
    }
    ```

- **Error Response: User is not authenticated**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Get Current User

Users can retrieve their own user information.

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/users/session
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "current_username",
      "email": "current_user@example.com",
      "bio": "Current user's bio",
      "profileImageUrl": "currentprofile.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27",
      "workoutPrograms": []
    }
    ```

- **Error Response: User is not logged in**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### Edit Current User

Users can update their own user information.

- **Require authentication**: True
- **Request**

  - **Method**: PUT
  - **Route path**: /api/users/session
  - **Body**:
    ```json
    {
      "bio": "this is the new bio",
      "profileImageUrl": "newprofileimage.url"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "current_username",
      "email": "current_user@example.com",
      "bio": "this is the new bio",
      "profileImageUrl": "newprofileimage.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27"
    }
    ```

## Workout Programs

### Get All Workout Programs

Users should be able to view all Workout Programs.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/workout_programs
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "userId": 1,
        "programName": "Beginner Program",
        "difficulty": "Beginner",
        "type": ["Abs", "Shoulders"],
        "equipment": ["Dumbbells", "Barbell"],
        "description": "A great program for beginners.",
        "imageUrl": "beginnerpicture.jpg",
        "createdAt": "2024-10-30 12:00:00",
        "updatedAt": "2024-10-31 14:20:00"
      },
      {
        "id": 2,
        "userId": 2,
        "programName": "Intermediate Program",
        "difficulty": "Intermediate",
        "type": ["Full Body", "Shoulders"],
        "equipment": ["Dumbbells", "Barbell"],
        "description": "A great program for those with some experience.",
        "imageUrl": "intermediatepicture.jpg",
        "createdAt": "2024-10-29 08:15:00",
        "updatedAt": "2024-10-30 09:00:00"
      }
    ]
    ```

### Get a Workout Program by ID

- **Require authentication**: False

- **Request**

  - **Method**: GET
  - **Route path**: /api/workout_programs/:workoutProgramId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "userId": 1,
      "programName": "Beginner Program",
      "difficulty": "Beginner",
      "type": "Full Body, Arms, Shoulders, Chest",
      "equipment": "Dumbbells",
      "description": "A great program for beginner users.",
      "imageUrl": "https://beginnerexample.com/image.jpg",
      "weeks": [
        {
          "id": 1,
          "name": "Week 1",
          "days": [
            {
              "id": 1,
              "name": "Sunday",
              "restDay": "false",
              "workouts": [
                {
                  "id": 1,
                  "dayId": 1,
                  "exercise": "Push-ups",
                  "description": "Standard push-ups for strength.",
                  "reps": 10,
                  "sets": 3,
                  "duration": null,
                  "weight": 30
                },
                {
                  "id": 2,
                  "dayId": 1,
                  "exercise": "Sit-ups",
                  "description": "Core-strengthening sit-ups.",
                  "reps": 15,
                  "sets": 3,
                  "duration": null,
                  "weight": 20
                }
              ]
            }
          ]
        }
      ],
      "createdAt": "2024-10-30 12:00:00",
      "updatedAt": "2024-10-31 14:20:00"
    }
    ```

### Create a Workout Program

- **Require authentication**: True

- **Request**

  - **Method**: POST
  - **Route path**: /api/workout_programs
  - **Body**:
    ```json
    {
      "programName": "Updated Program Name",
      "difficulty": "Advanced",
      "type": "Full Body, Arms, Shoulders, Chest",
      "equipment": "Dumbbells",
      "description": "A great program for advanced users.",
      "imageUrl": "https://advancedexample.com/image.jpg"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "id": 3,
      "programName": "Updated Program Name",
      "difficulty": "Intermediate",
      "type": "Full Body, Arms, Shoulders, Chest",
      "equipment": "Dumbbells",
      "description": "A great program for intermediate users.",
      "imageUrl": "https://intermediatedexample.com/image.jpg",
      "createdAt": "2024-11-01 10:30:00",
      "updatedAt": "2024-11-01 10:30:00"
    }
    ```

- **Error Response**: Missing required fields

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Fields are required."
    }
    ```

### Update a Workout Program

- **Require authentication**: True
- **Request**

  - **Method**: PUT
  - **Route path**: /api/workout_programs/:workoutProgramId
  - **Body**:
    ```json
    {
      "programName": "Updated Program Name",
      "difficulty": "Intermediate",
      "type": "Full Body",
      "equipment": "None",
      "description": "A great program for beginners.",
      "imageUrl": "https://updatedexample.com/image.jpg"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 3,
      "programName": "Updated Program Name",
      "difficulty": "Intermediate",
      "type": "Full Body",
      "equipment": "None",
      "description": "Updated description.",
      "imageUrl": "https://updatedexample.com/image.jpg",
      "createdAt": "2024-11-01 10:30:00",
      "updatedAt": "2024-11-02 11:00:00"
    }
    ```

### Delete a Workout Program

- **Require authentication**: True
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/workout_programs/:workoutProgramId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Workout Program has been removed!"
    }
    ```

## Weeks

### Get All Weeks by Workout Programs

Users can view all weeks for a workout program.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/workout_programs/:workoutProgramId/weeks
  - **Body**: None

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "workoutProgramId": 1,
        "createdAt": "2024-11-23T12:34:56",
        "updatedAt": "2024-11-23T12:34:56"
      },
      {
        "id": 2,
        "workoutProgramId": 1,
        "createdAt": "2024-11-22T11:11:11",
        "updatedAt": "2024-11-22T11:11:11"
      }
    ]
    ```

### Get A Specific Week By Id For A Workout program

Users can view a specific week for a workout program.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/weeks/:weekId

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "workoutProgramId": 1,
      "days": [
        { "id": 1, "name": "Sunday" },
        { "id": 2, "name": "Monday" },
        { "id": 3, "name": "Tuesday" },
        { "id": 4, "name": "Wednesday" },
        { "id": 5, "name": "Thursday" },
        { "id": 6, "name": "Friday" },
        { "id": 7, "name": "Saturday" }
      ],
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    }
    ```

### Create A New Week For A Workout Program

Users can create a new week for a workout program. When a new week is created, the days (Sunday-Saturday) will be automatically generated.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/weeks
  - **Body**:
    ```json
    {
      "workoutProgramId": 1
    }
    ```

- **Successful Response**:
  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "workoutProgramId": 1,
      "weekId": 1,
      "days": [
        { "id": 1, "name": "Sunday" },
        { "id": 2, "name": "Monday" },
        { "id": 3, "name": "Tuesday" },
        { "id": 4, "name": "Wednesday" },
        { "id": 5, "name": "Thursday" },
        { "id": 6, "name": "Friday" },
        { "id": 7, "name": "Saturday" }
      ]
    }
    ```

### Delete A Week For A Workout Program

Users can delete a week from a workout program. Deleting the week will also remove the associated days and workouts.

- **Require authentication**: True
- **Request**

- **Method**: DELETE

  - **Route path**: /api/weeks/:weekId
  - **Body**: None

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Week deleted successfully"
    }
    ```

## Days

### Get All Days by Workout Programs

Users can view all days for a week.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/weeks/:weekId/days
  - **Body**: None

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "weekId": 1,
        "name": "Sunday",
        "restDay": false,
        "createdAt": "2024-11-23T12:34:56",
        "updatedAt": "2024-11-23T12:34:56"
      },
      {
        "id": 2,
        "weekId": 1,
        "name": "Monday",
        "restDay": false,
        "createdAt": "2024-11-23T12:34:56",
        "updatedAt": "2024-11-23T12:34:56"
      }
    ]
    ```

### Get A Specific Day By Id For A Workout program

Users can view a specific day for a workout program.

- **Require authentication**: false
- **Request**

- **Method**: GET

  - **Route path**: /api/days/:dayId
  - **Body**: None

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "weekId": 1,
      "name": "Sunday",
      "restDay": false,
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    }
    ```

### Update A Specific Day From/To Rest Day

Users can update a day to either a rest day or a workout day.

- **Require authentication**: True
- **Request**

  - **Method**: PUT
  - **Route path**: /api/days/:dayId
  - **Body**:
    ```json
    {
      "restDay": true
    }
    ```

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "weekId": 1,
      "name": "Sunday",
      "restDay": true,
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    }
    ```

## Workouts

### Get All Workouts by Specific Day

Users can view all workouts for a specific day.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/days/:dayId/workouts
  - **Body**: None

- **Successful Response**:
- **Status Code**: 200
- **Body**:
  ```json
  [
    {
      "id": 1,
      "dayId": 1,
      "sets": 3,
      "reps": 12,
      "duration": null,
      "weight": 10,
      "restTime": 60,
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    },
    {
      "id": 2,
      "dayId": 1,
      "sets": null,
      "reps": null,
      "duration": 40,
      "weight": 15,
      "restTime": 90,
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    }
  ]
  ```

### Get A Specific Workout By Id

Users can view a specific workout for a day.

- **Require authentication**: false
- **Request**

  - **Method**: GET
  - **Route path**: /api/workouts/:workoutId
  - **Body**: None

- **Successful Response**:
- **Status Code**: 200
- **Body**:
  ```json
  {
    "id": 1,
    "dayId": 1,
    "sets": 3,
    "reps": 12,
    "duration": null,
    "weight": 10,
    "createdAt": "2024-11-23T12:34:56",
    "updatedAt": "2024-11-23T12:34:56"
  }
  ```

### Create A New Workout For A Day

Users can create a new workout for a specific day.

- **Require authentication**: True
- **Request**

- **Method**: POST
- **Route path**: /api/workouts
- **Body**:

  ```json
  {
    "dayId": 1,
    "exercise": "Dumbbell Curls",
    "sets": 4,
    "reps": 10,
    "weight": 15
  }
  ```

- **Successful Response**:
  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "message": "Workout created successfully",
      "workout": {
        "id": 3,
        "dayId": 1,
        "exercise": "Dumbbell Curls",
        "sets": 4,
        "reps": 10,
        "duration": null,
        "weight": 15,
        "createdAt": "2024-11-23T12:34:56",
        "updatedAt": "2024-11-23T12:34:56"
      }
    }
    ```

### Update A Specific Workout

Users can update a specific workout for a day.

- **Require authentication**: True
- **Request**

  - **Method**: PUT
  - **Route path**: /api/workouts/:workoutId
  - **Body**:
    ```json
    {
      "exercise": "Sit Ups",
      "sets": 5,
      "reps": 8,
      "weight": 20
    }
    ```

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "dayId": 1,
      "sets": 5,
      "reps": 8,
      "duration": null,
      "weight": 20,
      "createdAt": "2024-11-23T12:34:56",
      "updatedAt": "2024-11-23T12:34:56"
    }
    ```

### Delete A Workout

Users can delete a workout.

- **Require authentication**: True
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/workouts/:workoutId
  - **Body**: None

- **Successful Response**:
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Workout deleted successfully"
    }
    ```

## Favorites

### View Current User's Favorites

Users can view all their favorited workout programs.

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/favorites
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    [
      {
        "id": 1,
        "workoutPrograms": [
          {
            "id": 5,
            "programName": "Beginner Program",
            "difficulty": "Beginner",
            "type": "Full Body",
            "equipment": "None",
            "description": "A great program for beginners.",
            "imageUrl": "https://example.com/image.jpg"
          }
        ],
        "createdAt": "2024-11-23T12:34:56"
      },
      {
        "id": 2,
        "workoutPrograms": [
          {
            "id": 6,
            "programName": "Advanced Program",
            "difficulty": "Advanced",
            "type": "Strength",
            "equipment": "Dumbbells",
            "description": "A challenging program for experienced athletes.",
            "imageUrl": "https://example.com/image2.jpg"
          }
        ],
        "createdAt": "2024-11-22T11:11:11"
      }
    ]
    ```

### Add A Favorite

Users can add a workout program to their favorite list.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/favorites
  - **Body**:
    ```json
    {
      "workoutProgramId": 2
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "id": 1,
      "userid": 1,
      "workoutPrograms": [
        {
          "id": 2,
          "userId": 2,
          "programName": "Intermediate Program",
          "difficulty": "Intermediate",
          "type": ["Full Body", "Shoulders"],
          "equipment": ["Dumbbells", "Barbell"],
          "description": "A great program for those with some experience.",
          "imageUrl": "intermediatepicture.jpg",
          "createdAt": "2024-10-29 08:15:00",
          "updatedAt": "2024-10-30 09:00:00"
        }
      ]
    }
    ```

- **Error Response** - Already favorited.

  - **Status Code**: 409
  - **Body**:
    ```json
    {
      "message": "This workout program is already in your favorites."
    }
    ```

### Remove A Favorite

- **Require authentication**: True
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/favorites/:workoutProgramId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Workout has been removed from your favorites."
    }
    ```

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.
