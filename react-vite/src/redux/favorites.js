import { fetchWorkoutProgramById } from "./workoutprogram";

const LOAD_FAVORITES = "favorites/loadFavorites";
const ADD_FAVORITE = "favorites/addFavorite";
const DELETE_FAVORITE = "favorites/deleteFavorite";

export const loadFavorites = (favorites) => ({
    type: LOAD_FAVORITES,
    favorites
})

const addFavoriteAction = (workoutProgram) => ({
    type: ADD_FAVORITE,
    workoutProgram
})

const deleteFavoriteAction = (workoutProgramId) => ({
    type: DELETE_FAVORITE,
    workoutProgramId
})

export const fetchFavorites = () => async (dispatch) => {
    try {
        const response = await fetch('/api/favorites/session');
        if (response.ok) {
            const data = await response.json();
            dispatch(loadFavorites(data.favorites));
        } else {
            console.error("Failed to load favorites");
        }
    } catch (e) {
        console.error("Failed to fetch favorites:", e)
    }
}

export const addFavorite = (workoutProgramId) => async (dispatch) => {
    try {
        const response = await fetch('/api/favorites/session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ workoutProgramId })
        });

        if (response.ok) {
            const data = await response.json();
            const workoutProgram = await dispatch(fetchWorkoutProgramById(workoutProgramId));
            dispatch(addFavoriteAction(workoutProgram))
            return data
        } else {
            const error = await response.json();
            console.error("Failed to add program to favorites:", error.message);
        }
    } catch (e) {
        console.error("Error adding to favorites:", e)
    } finally {
        dispatch(fetchFavorites())
    }
}

export const deleteFavorite = (workoutProgramId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/favorites/session/${workoutProgramId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const deleted = await response.json();
            if (deleted.errors) return deleted.errors
            await dispatch(deleteFavoriteAction(workoutProgramId))
        }
    } catch (e) {
        return { server: "Something went wrong. Try again." }
    } finally {
        dispatch(fetchFavorites());
    }
};

const initialState = [];

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITES:
            return [...action.favorites];

        case ADD_FAVORITE:
            return [...state, action.workoutProgram];

        case DELETE_FAVORITE:
            return state.filter(program => program.workoutProgramId !== action.workoutProgramId);

        default:
            return state;
    }
};

export default favoritesReducer;
