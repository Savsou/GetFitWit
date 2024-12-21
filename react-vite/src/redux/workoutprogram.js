const SET_WORKOUT_PROGRAMS = "workoutPrograms/setWorkoutPrograms";
const ADD_WORKOUT_PROGRAM = "workoutPrograms/addWorkoutProgram";
const UPDATE_WORKOUT_PROGRAM = "workoutPrograms/updateWorkoutProgram";
const DELETE_WORKOUT_PROGRAM = "workoutPrograms/deleteWorkoutProgram";
const SET_WORKOUT_PROGRAM_BY_ID = "workoutPrograms/setWorkoutProgramById";
const SET_LOADING = 'SET_LOADING';
const RESET_CURRENT_WORKOUT_PROGRAM = "workoutPrograms/resetWorkoutProgram";

const setWorkoutPrograms = (difficulty, workoutPrograms, totalPages, currentPage) => ({
    type: SET_WORKOUT_PROGRAMS,
    payload: {
        difficulty,
        workoutPrograms,
        totalPages,
        currentPage,
    },
});

const setWorkoutProgramById = (workoutProgram) => ({
    type: SET_WORKOUT_PROGRAM_BY_ID,
    payload: workoutProgram,
})

const resetWorkoutProgram = () => ({
    type: RESET_CURRENT_WORKOUT_PROGRAM
});

export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload: loading
});

const addWorkoutProgramAction = (workoutProgram) => ({
    type: ADD_WORKOUT_PROGRAM,
    payload: workoutProgram,
});

const deleteWorkoutProgramAction = (workoutProgramId) => ({
    type: DELETE_WORKOUT_PROGRAM,
    payload: workoutProgramId,
})

const updateWorkoutProgramAction = (workoutProgram, oldDifficulty) => ({
    type: UPDATE_WORKOUT_PROGRAM,
    payload: workoutProgram,
    oldDifficulty
})


export const fetchWorkoutPrograms = (difficulty, page) => async (dispatch) => {
    dispatch(setLoading(true));
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
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchWorkoutProgramById = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`/api/workout_programs/${id}`);

        if (!response.ok) {
            console.error("Failed. Workout Program does not exist.");
            return;
        }

        const data = await response.json();
        dispatch(setWorkoutProgramById(data))
    } catch (e) {
        console.error("Failed to fetch workout program:", e)
    } finally {
        dispatch(setLoading(false));
    }
};

export const resetCurrentWorkoutProgram = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        dispatch(resetWorkoutProgram())
    } finally {
        dispatch(setLoading(false));
    }
};

export const addWorkoutProgram = (formData) => async (dispatch) => {
    dispatch(setLoading(true));
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
        return { server: "Something went wrong. Try again." }
    } finally {
        dispatch(fetchWorkoutPrograms('beginner', 1));
        dispatch(fetchWorkoutPrograms('intermediate', 1));
        dispatch(fetchWorkoutPrograms('advanced', 1));
        dispatch(setLoading(false));
    }
};

export const deleteWorkoutProgram = (workoutProgramId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`/api/workout_programs/${workoutProgramId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            dispatch(deleteWorkoutProgramAction(workoutProgramId));
        } else if (response.status < 500) {
            const errorMessages = await response.json();
            console.error("Error deleting workout program:", errorMessages);
            return errorMessages;
        }
    } catch (error) {
        console.error('Failed to delete workout program:', error);
        return { server: "Something went wrong. Try again." };
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateWorkoutProgram = (id, formData, oldDifficulty) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch(`/api/workout_programs/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            const updatedWorkoutProgram = await response.json();
            dispatch(updateWorkoutProgramAction(updatedWorkoutProgram, oldDifficulty));
        } else if (response.status < 500) {
            const errorMessages = await response.json();
            console.error("Validation Errors:", errorMessages);
            return errorMessages;
        }
    } catch (e) {
        return { server: "Something went wrong. Try again." };
    } finally {
        dispatch(setLoading(false));
    }
};


const initialState = {
    workoutPrograms: {},
    pagination: {},
    currentWorkoutProgram: null,
    loading: false,
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

        case SET_WORKOUT_PROGRAM_BY_ID: {
            const workoutProgram = action.payload;
            return {
                ...state,
                currentWorkoutProgram: workoutProgram,
            };
        }

        case RESET_CURRENT_WORKOUT_PROGRAM: {
            return {
                ...state,
                currentWorkoutProgram: null
            };
        }

        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
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

        case DELETE_WORKOUT_PROGRAM: {
            const workoutProgramId = action.payload;

            const updatedWorkoutPrograms = {};
            for (const difficulty in state.workoutPrograms) {
                updatedWorkoutPrograms[difficulty] = state.workoutPrograms[difficulty].filter(
                    program => program.id !== workoutProgramId
                );
            }

            return {
                ...state,
                workoutPrograms: updatedWorkoutPrograms
            };
        }

        case UPDATE_WORKOUT_PROGRAM: {
            const updatedWorkoutProgram = action.payload;
            const difficulty = updatedWorkoutProgram.difficulty;
            const oldDifficulty = action.oldDifficulty;

            const newState = {
                ...state,
                workoutPrograms: {
                    ...state.workoutPrograms,
                    [oldDifficulty]: state.workoutPrograms[oldDifficulty].filter(
                        program => program.id !== updatedWorkoutProgram.id
                    ),
                    [difficulty]: [
                        ...state.workoutPrograms[difficulty] || [],
                        updatedWorkoutProgram
                    ]
                }
            };

            return newState;
        }

        default:
            return state;
    }
};

export default workoutProgramReducer;
