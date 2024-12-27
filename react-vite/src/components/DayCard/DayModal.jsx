import { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import EditWorkoutModal from '../EditWorkoutModal/EditWorkoutModal';
import './DayModal.css';

const DayModal = ({ day, isOwner, weekIndex, dayIndex, onToggleRestDay }) => {
    const { setModalContent, closeModal } = useModal();
    const [isRestDay, setIsRestDay] = useState(day.restDay);
    const [workouts, setWorkouts] = useState(day.workouts);

    useEffect(() => {
        setIsRestDay(day.restDay);
        setWorkouts(day.workouts);
    }, [day]);

    const handleToggleRestDay = () => {
        onToggleRestDay(weekIndex, dayIndex);
        setIsRestDay(prevState => !prevState);
    };

    const handleEditButtonClick = () => {
        setModalContent(
            <EditWorkoutModal
                workouts={workouts}
                day={day}
                onClose={closeModal}
                onSave={handleSaveWorkouts}
            />
        );
    };

    const handleSaveWorkouts = async (updatedWorkouts) => {
        setWorkouts(updatedWorkouts);
        closeModal();
        setModalContent(
            <DayModal
                day={{ ...day, workouts: updatedWorkouts }}
                isOwner={isOwner}
                weekIndex={weekIndex}
                dayIndex={dayIndex}
                onToggleRestDay={onToggleRestDay}
            />
        )
    }

    return (
        <div className="day-modal">
            <h2 className='day-title'>{day.name}</h2>

            {isOwner && (
                <div className='rest-day-container'>
                    <div className="rest-day-switch">
                        {/* Toggle Switch */}
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={isRestDay}
                                onChange={handleToggleRestDay}
                            />
                            <span className="slider"></span>
                        </label>
                        <span>{isRestDay ? "Rest Day" : "Workout Day"}</span>
                    </div>
                </div>
            )}
            <div className='workouts-container'>
                {isOwner && (
                    <div className='edit-workout-button-container'>
                        <button
                            onClick={handleEditButtonClick}
                            className='edit-workout-button'
                        >
                            Edit
                        </button>
                    </div>
                )}
                {workouts.length > 0 ? (
                    workouts.map((workout, index) => (
                        <div key={workout.id || index} className="day-modal-workouts">
                            <div className="workout-info">
                                {/* Display sets/reps or duration */}
                                {workout.workout_type === 'sets_reps' && (
                                    <span className="sets-reps">
                                        {workout.sets} x {workout.reps}
                                    </span>
                                )}
                                {workout.workout_type === 'duration' && (
                                    <span className="duration">
                                        {workout.minutes}m{workout.seconds}s
                                    </span>
                                )}
                                <span className="exercise-name">{workout.exercise}</span>
                            </div>
                            <div className="weights">
                                <span>{workout.weight ? `${workout.weight} lbs` : "0 lbs"}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No workouts scheduled</p>
                )}
            </div>
            <div className='submit-close-button-container'>
                <button
                    onClick={closeModal}
                    className='close-button'
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default DayModal;
