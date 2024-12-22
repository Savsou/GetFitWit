const ADD_WORKOUT = "workouts/addWorkout";
const UPDATE_WORKOUTS = "workouts/updateWorkout";
const DELETE_WORKOUT = "workouts/deleteWorkout";
const SET_WORKOUTS = "workouts/setWorkouts";
const RESET_WORKOUTS = "workouts/resetWorkouts";

const setWorkouts = (workouts) => ({
    type: SET_WORKOUTS,
    payload: workouts,
});

const addWorkout = (workout) => ({
    type: ADD_WORKOUT,
    payload: workout,
});

const updateWorkout = (workouts) => ({
    type: UPDATE_WORKOUTS,
    payload: workouts,
});

const deleteWorkout = (workoutId) => ({
    type: DELETE_WORKOUT,
    payload: workoutId,
});

const resetWorkouts = () => ({
    type: RESET_WORKOUTS,
});

const initialState = {
    workouts: {},
    loading: false,
};

const workoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORKOUTS: {
            return {
                ...state,
                workouts: action.payload,
            };
        }

        case ADD_WORKOUT: {
            const newWorkout = action.payload;
            return {
                ...state,
                workouts: {
                    ...state.workouts,
                    [newWorkout.day]: [...(state.workouts[newWorkout.day] || []), newWorkout],
                },
            };
        }

        case UPDATE_WORKOUT: {
            const updatedWorkout = action.payload;
            return {
                ...state,
                workouts: {
                    ...state.workouts,
                    [updatedWorkout.day]: state.workouts[updatedWorkout.day].map((workout) =>
                        workout.id === updatedWorkout.id ? updatedWorkout : workout
                    ),
                },
            };
        }

        case DELETE_WORKOUT: {
            const workoutId = action.payload;
            const updatedWorkouts = { ...state.workouts };

            for (const day in updatedWorkouts) {
                updatedWorkouts[day] = updatedWorkouts[day].filter((workout) => workout.id !== workoutId);
            }

            return {
                ...state,
                workouts: updatedWorkouts,
            };
        }

        case RESET_WORKOUTS: {
            return {
                ...state,
                workouts: {},
            };
        }

        default:
            return state;
    }
};

export default workoutReducer;
