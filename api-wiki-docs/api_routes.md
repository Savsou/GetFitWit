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
      "username": "desired_username",
      "email": "user@example.com",
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
  - **Route path**: /api/workout_programs/:id
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
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
  - **Route path**: /api/workout_programs/:id
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
  - **Route path**: /api/workout_programs/:id
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
  - **Route path**: /api/workout_programs/:workoutProgramId/weeks/:weekId

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
  - **Route path**: /api/workout_programs/:workoutProgramId/weeks
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

  - **Route path**: /api/workout_programs/<workoutProgramId>/weeks/<weekId>
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

### Get A Specific Workout By Id For A Day

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

  - **Method**: PUT
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
