const SET_WORKOUT_PROGRAMS = "workoutPrograms/setWorkoutPrograms"

const setWorkoutPrograms = (difficulty, workoutPrograms, totalPages, currentPage) => ({
    type: SET_WORKOUT_PROGRAMS,
    payload: {
        difficulty,
        workoutPrograms,
        totalPages,
        currentPage,
    },
});

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

const initialState = {
    workoutPrograms: {},
    pagination: {},
};

const workoutProgramReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORKOUT_PROGRAMS: {
            console.log("Reducer called with payload:", action.payload);
            console.log("Previous state:", state);

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

            // console.log("New state:", newState);
            return newState;
        }

        default:
            return state;
    }
};

export default workoutProgramReducer;
