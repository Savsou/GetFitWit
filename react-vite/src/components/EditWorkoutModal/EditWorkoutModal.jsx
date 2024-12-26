import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateWorkout, fetchWorkoutProgramById, deleteWorkout, addWorkout } from '../../redux/workoutprogram';
import ConfirmingModal from '../../context/ConfirmingModal';
import AddWorkoutForm from '../AddWorkoutForm/AddWorkoutForm';
import "./EditWorkoutModal.css"

const EditWorkoutModal = ({ workouts, day, onClose, onSave }) => {
    const dispatch = useDispatch();
    const [originalWorkouts, setOriginalWorkouts] = useState([]);
    const [editedWorkouts, setEditedWorkouts] = useState([]);
    const workoutProgramId = useSelector(state => state.workoutPrograms.currentWorkoutProgram.id);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workoutToDelete, setWorkoutToDelete] = useState(null);

    useEffect(() => {
        setOriginalWorkouts(workouts);
        setEditedWorkouts(workouts);
    }, [workouts]);

    const handleSave = async (e) => {
        e.preventDefault();

        setErrors({});

        let hasErrors = false;
        let newErrors = {};

        for (const workout of editedWorkouts) {
            const response = await dispatch(updateWorkout(workout));

            if (response?.errors) {
                hasErrors = true;

                // Loop through each error and add it only for specific fields
                Object.keys(response.errors).forEach((errorField) => {
                    if (!newErrors[workout.id]) {
                        newErrors[workout.id] = {};
                    }

                    // Grab one error for each field
                    if (!newErrors[workout.id][errorField]) {
                        newErrors[workout.id][errorField] = response.errors[errorField][0];
                    }
                });
            }
        }

        if (hasErrors) {
            setErrors(newErrors);
        } else {
            dispatch(fetchWorkoutProgramById(workoutProgramId))
            onSave(editedWorkouts);
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

    const openModal = (workoutId) => {
        setWorkoutToDelete(workoutId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setWorkoutToDelete(null);
        setIsModalOpen(false);
    };

    const confirmDelete = async () => {
        if (workoutToDelete) {
            closeModal();
            await dispatch(deleteWorkout(workoutToDelete));

            // Update the workouts in the editedWorkouts array
            const updatedWorkouts = editedWorkouts.filter(workout => workout.id !== workoutToDelete);
            setEditedWorkouts(updatedWorkouts);

            // Fetch updated workout program and pass the updated workouts to the parent
            // await dispatch(fetchWorkoutProgramById(workoutProgramId))
        }
    };

    const handleAddWorkout = async (newWorkout) => {
        // Add the day.id to the new workout before updating
        const updatedWorkout = { ...newWorkout, dayId: day.id };

        const response = await dispatch(addWorkout(updatedWorkout));

        // Initialize an empty errors object for this workout
        let workoutErrors = {};

        if (response?.errors) {
            // Loop through the errors and add only the specific field errors
            Object.keys(response.errors).forEach((errorField) => {
                // Add the error only for the current workout and error field
                if (!workoutErrors[errorField]) {
                    workoutErrors[errorField] = response.errors[errorField][0];
                }
            });

            // Return the specific errors for this workout
            return { errors: workoutErrors };
        }

        // If the response contains a valid ID, add it to the workouts list
        if (response?.id) {
            const updatedWorkouts = [...editedWorkouts, response];
            setEditedWorkouts(updatedWorkouts);
        }
    };

    return (
        <div className="edit-workout-modal">
            <div className='workout-heading'>
                <h2>Edit Workouts for {day.name}</h2>
            </div>

            <form onSubmit={handleSave}>
                <div className="workouts-list">
                    {editedWorkouts.map((workout) => (
                        <div key={workout.id} className="workout">
                            <div className="workout-name-container">
                                <label>Exercise</label>
                                <input
                                    type="text"
                                    name="exercise"
                                    value={workout.exercise}
                                    onChange={(e) => handleChange(e, workout.id)}
                                />
                                {errors[workout.id]?.exercise && (
                                    <p className="error-message">{errors[workout.id].exercise}</p>
                                )}
                            </div>
                            <div className="workout-type-container">
                                <label>Workout Type</label>
                                <select
                                    name="workout_type"
                                    value={workout.workout_type}
                                    onChange={(e) => handleChange(e, workout.id)}
                                >
                                    <option value="sets_reps">Sets/Reps</option>
                                    <option value="duration">Duration</option>
                                </select>
                                {errors[workout.id]?.workout_type && (
                                    <p className="error-message">{errors[workout.id].workout_type}</p>
                                )}
                            </div>
                            {workout.workout_type === 'sets_reps' && (
                                <div className="sets-reps-group">
                                    <div className="workout-input">
                                        <label>Sets</label>
                                        <input
                                            type="number"
                                            name="sets"
                                            value={workout.sets}
                                            onChange={(e) => handleChange(e, workout.id)}
                                        />
                                        {errors[workout.id]?.sets && (
                                            <p className="error-message">{errors[workout.id].sets}</p>
                                        )}
                                    </div>
                                    <div className="workout-input">
                                        <label>Reps</label>
                                        <input
                                            type="number"
                                            name="reps"
                                            value={workout.reps}
                                            onChange={(e) => handleChange(e, workout.id)}
                                        />
                                        {errors[workout.id]?.reps && (
                                            <p className="error-message">{errors[workout.id].reps}</p>
                                        )}
                                    </div>
                                </div>

                            )}
                            {workout.workout_type === 'duration' && (
                                <div className="mins-secs-group">
                                    <div className="workout-input">
                                        <label>Minutes</label>
                                        <input
                                            type="number"
                                            name="minutes"
                                            value={workout.minutes}
                                            onChange={(e) => handleChange(e, workout.id)}
                                        />
                                        {errors[workout.id]?.minutes && (
                                            <p className="error-message">{errors[workout.id].minutes}</p>
                                        )}
                                    </div>
                                    <div className="workout-input">
                                        <label>Seconds</label>
                                        <input
                                            type="number"
                                            name="seconds"
                                            value={workout.seconds}
                                            onChange={(e) => handleChange(e, workout.id)}
                                        />
                                        {errors[workout.id]?.seconds && (
                                            <p className="error-message">{errors[workout.id].seconds}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            <div className='weight-input'>
                                <label>Weight</label>
                                <input
                                    type="number"
                                    name="weight"
                                    value={workout.weight}
                                    onChange={(e) => handleChange(e, workout.id)}
                                />
                                {errors[workout.id]?.weight && (
                                    <p className="error-message">{errors[workout.id].weight}</p>
                                )}
                            </div>
                            <div>
                                <button
                                    className="delete-workout-button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openModal(workout.id);
                                    }}
                                >
                                    Delete Workout
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="workout-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleClose}>Close</button>
                </div>
            </form>
            <AddWorkoutForm onAddWorkout={handleAddWorkout} dayId={day.id} />

            <ConfirmingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="This action cannot be undone. Are you sure you want to delete this workout?"
            />
        </div>
    );
};

export default EditWorkoutModal;
