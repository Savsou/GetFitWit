import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateWorkout } from '../../redux/workoutprogram';

const EditWorkoutModal = ({ workouts, day, onClose, onSave }) => {
    const dispatch = useDispatch();
    const [originalWorkouts, setOriginalWorkouts] = useState([]);
    const [editedWorkouts, setEditedWorkouts] = useState([]);
    const workoutProgramId = useSelector(state => state.workoutPrograms.currentWorkoutProgram.id);
    const dayId = day.id

    useEffect(() => {
        setOriginalWorkouts(workouts);
        setEditedWorkouts(workouts);
    }, [workouts]);

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            for (const workout of editedWorkouts) {
                await dispatch(updateWorkout(workout, workoutProgramId));
            }

            // After saving, call onSave callback
            onSave(editedWorkouts);
        } catch (error) {
            console.error('Error saving workouts:', error);
        }
    };

    const handleChange = (e, workoutId) => {
        const { name, value } = e.target;
        const updatedWorkouts = editedWorkouts.map(workout =>
            workout.id === workoutId ? { ...workout, [name]: value } : workout
        );
        setEditedWorkouts(updatedWorkouts);
    };

    const handleClose = () => {
        setEditedWorkouts(originalWorkouts);
        onClose();
    };

    return (
        <div className="edit-workout-modal">
            <h3>Edit Workouts for {day.name}</h3>

            <form onSubmit={handleSave}>
                <div className="workouts-list">
                    {editedWorkouts.map((workout) => (
                        <div key={workout.id} className="workout">
                            <label>Exercise</label>
                            <input
                                type="text"
                                name="exercise"
                                value={workout.exercise}
                                onChange={(e) => handleChange(e, workout.id)}
                            />
                            <label>Workout Type</label>
                            <select
                                name="workout_type"
                                value={workout.workout_type}
                                onChange={(e) => handleChange(e, workout.id)}
                            >
                                <option value="sets_reps">Sets/Reps</option>
                                <option value="duration">Duration</option>
                            </select>
                            <label>Sets</label>
                            <input
                                type="number"
                                name="sets"
                                value={workout.sets}
                                onChange={(e) => handleChange(e, workout.id)}
                            />
                            <label>Reps</label>
                            <input
                                type="number"
                                name="reps"
                                value={workout.reps}
                                onChange={(e) => handleChange(e, workout.id)}
                            />
                            <label>Weight</label>
                            <input
                                type="number"
                                name="weight"
                                value={workout.weight}
                                onChange={(e) => handleChange(e, workout.id)}
                            />
                        </div>
                    ))}
                </div>
                <div className="modal-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Close</button>
                </div>
            </form>

        </div>
    );
};

export default EditWorkoutModal;
