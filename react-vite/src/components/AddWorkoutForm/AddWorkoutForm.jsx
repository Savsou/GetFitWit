import { useState } from 'react';


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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorkout(prev => ({ ...prev, [name]: value }));
    };

    const handleAddWorkout = (e) => {
        e.preventDefault();

        const filteredWorkout = {
            ...newWorkout,
            sets: newWorkout.sets || 0,
            reps: newWorkout.reps || 0,
            minutes: newWorkout.minutes || 0,
            seconds: newWorkout.seconds || 0,
        };

        onAddWorkout(filteredWorkout);
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
    };

    return (
        <form onSubmit={handleAddWorkout}>
            <div>
                <label>Exercise</label>
                <input
                    type="text"
                    name="exercise"
                    value={newWorkout.exercise}
                    onChange={handleInputChange}
                    placeholder="Exercise"
                    required
                />
            </div>
            <div>
                <label>Workout Type</label>
                <select
                    name="workout_type"
                    value={newWorkout.workout_type}
                    onChange={handleInputChange}
                >
                    <option value="sets_reps">Sets/Reps</option>
                    <option value="duration">Duration</option>
                </select>
            </div>
            {newWorkout.workout_type === 'sets_reps' && (
                <div>
                    <input
                        type="number"
                        name="sets"
                        value={newWorkout.sets}
                        onChange={handleInputChange}
                        placeholder="Sets"
                        required
                    />
                    <input
                        type="number"
                        name="reps"
                        value={newWorkout.reps}
                        onChange={handleInputChange}
                        placeholder="Reps"
                        required
                    />
                </div>
            )}
            {newWorkout.workout_type === 'duration' && (
                <div>
                    <input
                        type="number"
                        name="minutes"
                        value={newWorkout.minutes}
                        onChange={handleInputChange}
                        placeholder="Minutes"
                        required
                    />
                    <input
                        type="number"
                        name="seconds"
                        value={newWorkout.seconds}
                        onChange={handleInputChange}
                        placeholder="Seconds"
                        required
                    />
                </div>
            )}
            <div>
                <input
                    type="number"
                    name="weight"
                    value={newWorkout.weight}
                    onChange={handleInputChange}
                    placeholder="Weight"
                    required
                />
            </div>
            <button type="submit">Add Workout</button>
        </form>
    );
};

export default AddWorkoutForm;
