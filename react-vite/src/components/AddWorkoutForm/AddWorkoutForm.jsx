import { useState } from 'react';
import "../EditWorkoutModal/EditWorkoutModal.css"

const AddWorkoutForm = ({ onAddWorkout, dayId }) => {
    const [newWorkout, setNewWorkout] = useState({
        exercise: '',
        workout_type: 'sets_reps',
        sets: '',
        reps: '',
        weight: '',
        minutes: '',
        seconds: '',
        dayId: dayId,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorkout(prev => ({ ...prev, [name]: value }));
    };

    const submitAddWorkout = async (e) => {
        e.preventDefault();

        const filteredWorkout = {
            ...newWorkout,
            sets: newWorkout.sets || 0,
            reps: newWorkout.reps || 0,
            minutes: newWorkout.minutes || 0,
            seconds: newWorkout.seconds || 0,
        };

        const result = await onAddWorkout(filteredWorkout);

        if (result?.errors) {
            setErrors(result.errors);
        } else {
            setNewWorkout({
                exercise: '',
                workout_type: 'sets_reps',
                sets: '',
                reps: '',
                weight: '',
                minutes: '',
                seconds: '',
                dayId: dayId,
            });
        }
    };

    return (
        <form onSubmit={submitAddWorkout}>
            <div className='workout-heading'>
                <h2>Add A Workout</h2>
            </div>
            <div className='workout-name-container'>
                <input
                    type="text"
                    name="exercise"
                    value={newWorkout.exercise}
                    onChange={handleInputChange}
                    placeholder="Exercise"
                />
                {errors.exercise && (<p className="add-workout-error-message">{errors.exercise}</p>)}
            </div>
            <div className='workout-type-container'>
                <label>Workout Type</label>
                <select
                    name="workout_type"
                    value={newWorkout.workout_type}
                    onChange={handleInputChange}
                >
                    <option value="sets_reps">Sets/Reps</option>
                    <option value="duration">Duration</option>
                </select>
                {errors.workout_type && (<p className="add-workout-error-message">{errors.workout_type}</p>)}
            </div>
            {newWorkout.workout_type === 'sets_reps' && (
                <div className='sets-reps-group'>
                    <div className='workout-input'>
                        <input
                            type="number"
                            name="sets"
                            value={newWorkout.sets}
                            onChange={handleInputChange}
                            placeholder="Sets"
                        />
                        {errors.sets && (<p className="add-workout-error-message">{errors.sets}</p>)}
                    </div>
                    <div className='workout-input'>
                        <input
                            type="number"
                            name="reps"
                            value={newWorkout.reps}
                            onChange={handleInputChange}
                            placeholder="Reps"
                        />
                        {errors.reps && (<p className="add-workout-error-message">{errors.reps}</p>)}
                    </div>
                </div>
            )}
            {newWorkout.workout_type === 'duration' && (
                <div className='mins-secs-group'>
                    <div className='workout-input'>
                        <input
                            type="number"
                            name="minutes"
                            value={newWorkout.minutes}
                            onChange={handleInputChange}
                            placeholder="Minutes"
                        />
                        {errors.minutes && (<p className="add-workout-error-message">{errors.minutes}</p>)}
                    </div>
                    <div className='workout-input'>
                        <input
                            type="number"
                            name="seconds"
                            value={newWorkout.seconds}
                            onChange={handleInputChange}
                            placeholder="Seconds"
                        />
                        {errors.seconds && (<p className="add-workout-error-message">{errors.seconds}</p>)}
                    </div>
                </div>
            )}
            <div className='weight-input'>
                <input
                    type="number"
                    name="weight"
                    value={newWorkout.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
                />
                {errors.weight && (<p className="add-workout-error-message">{errors.weight}</p>)}
            </div>
            <div className='add-workout-button-container'>
                <button type="submit">Add Workout</button>
            </div>
        </form>
    );
};

export default AddWorkoutForm;
