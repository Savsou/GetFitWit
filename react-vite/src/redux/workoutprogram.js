const SET_WORKOUT_PROGRAMS = "workoutPrograms/setWorkoutPrograms";
const ADD_WORKOUT_PROGRAM = "workoutPrograms/addWorkoutProgram";
const UPDATE_WORKOUT_PROGRAM = "workoutPrograms/updateWorkoutProgram";

const setWorkoutPrograms = (difficulty, workoutPrograms, totalPages, currentPage) => ({
    type: SET_WORKOUT_PROGRAMS,
    payload: {
        difficulty,
        workoutPrograms,
        totalPages,
        currentPage,
    },
});

const addWorkoutProgramAction = (workoutProgram) => ({
    type: ADD_WORKOUT_PROGRAM,
    payload: workoutProgram,
});

const updateWorkoutProgramAction = (workoutProgram) => ({
    type: UPDATE_WORKOUT_PROGRAM,
    payload: workoutProgram,
})

export const fetchWorkoutPrograms = (difficulty, page) => async (dispatch) => {
    try {
        const response = await fetch(`/api/workout_programs/difficulties?difficulty=${difficulty}&page=${page}&per_page=4`);

        if (!response.ok) {
            console.error("API error:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        dispatch(setWorkoutPrograms(difficulty.toLowerCase(), data.workout_programs, data.total_pages, page));
    } catch (error) {
        console.error('Failed to fetch workout programs:', error);
    }
};

export const addWorkoutProgram = (formData) => async dispatch => {
    try {
        const response = await fetch('/api/workout_programs/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const newWorkoutProgram = await response.json();
            dispatch(addWorkoutProgramAction(newWorkoutProgram));
        }
        else if (response.status < 500) {
            const errorMessages = await response.json();
            console.error("Validation Errors:", errorMessages)
            return errorMessages
        }

    } catch (e) {
        return { server: "Something went wrong. Try again."}
    }

};

const initialState = {
    workoutPrograms: {},
    pagination: {},
};

const workoutProgramReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORKOUT_PROGRAMS: {
            const { difficulty, workoutPrograms, totalPages, currentPage } = action.payload;

            const newState = {
                ...state,
                workoutPrograms: {
                    ...state.workoutPrograms,
                    [difficulty]: workoutPrograms,
                },
                pagination: {
                    ...state.pagination,
                    [difficulty]: { totalPages, currentPage },
                },
            };

            return newState;
        }

        case ADD_WORKOUT_PROGRAM: {
            const newWorkoutProgram = action.payload;
            const difficulty = newWorkoutProgram.difficulty;

            return {
                ...state,
                workoutPrograms: {
                    ...state.workoutPrograms,
                    [difficulty]: [newWorkoutProgram, ...state.workoutPrograms[difficulty]]
                },
            };
        }

        default:
            return state;
    }
};

export default workoutProgramReducer;
