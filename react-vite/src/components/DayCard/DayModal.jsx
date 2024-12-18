import { useState, useEffect } from 'react';
import './DayModal.css';

const DayModal = ({ day, onClose, isOwner, weekIndex, dayIndex, onToggleRestDay }) => {
    const [isRestDay, setIsRestDay] = useState(day.restDay);

    useEffect(() => {
        setIsRestDay(day.restDay);
    }, [day]);

    const handleToggleRestDay = () => {
        onToggleRestDay(weekIndex, dayIndex);
        setIsRestDay(prevState => !prevState);
    };

    return (
        <div className="modal">
            <h2>Edit {day.name}</h2>
            <div>
                <p>
                    <strong>Rest Day:</strong>
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
                </p>
            </div>
            {isOwner && (
                <div>
                    <button onClick={onClose}>Close</button>
                </div>
            )}
        </div>
    );
};

export default DayModal;
