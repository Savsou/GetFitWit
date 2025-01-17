import { useModal } from '../../context/Modal';
import DayModal from './DayModal';
import "./DayCard.css"

const DayCard = ({ day, isOwner, onToggleRestDay }) => {
    const { setModalContent, closeModal } = useModal();

    const handleCardClick = () => {
        setModalContent(
            <DayModal
                day={day}
                onClose={closeModal}
                isOwner={isOwner}
                onToggleRestDay={onToggleRestDay}
            />
        );
    };

    const limitedWorkouts = day.workouts.slice(0, 3);

    return (
        <div className={`day-card ${day.restDay ? "rest-day-card" : ""}`} onClick={handleCardClick}>
            <h2>{day.name}</h2>
            <p className='rest-day-status'>{day.restDay ? "Rest Day" : "Workout Day"}</p>

            {!day.restDay && (
                <div className="workouts">
                    {limitedWorkouts.length > 0 ? (
                        limitedWorkouts.map((workout) => (
                            <div key={workout.id} className="workout">
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
                    {day.workouts.length > 3 && (
                        <p className='see-more'>Click to see more workouts</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default DayCard;
