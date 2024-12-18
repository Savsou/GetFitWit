import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutProgramById } from "../../redux/workoutprogram";
import ConfirmingModal from "../../context/ConfirmingModal";
import DayCard from "../DayCard";
import "./WorkoutProgramDetailsPage.css"

const WorkoutProgramDetailsPage = () => {
    const { workoutProgramId } = useParams();
    const dispatch = useDispatch();
    const currentWorkoutProgram = useSelector(state => state.workoutPrograms.currentWorkoutProgram);
    const isLoading = useSelector(state => state.workoutPrograms.loading);
    const currentUser = useSelector(state => state.session.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekToDelete, setWeekToDelete] = useState();
    const [weeks, setWeeks] = useState([]);
    const [isAddingWeek, setIsAddingWeek] = useState(false);

    // console.log("workout program", currentWorkoutProgram)
    // console.log("Weeks", currentWorkoutProgram.weeks)

    useEffect(() => {
        // Clear the current workout program before loading a new one
        dispatch(fetchWorkoutProgramById(workoutProgramId));
    }, [dispatch, workoutProgramId])

    useEffect(() => {
        if (currentWorkoutProgram?.weeks) {
            setWeeks(currentWorkoutProgram.weeks);
        }
    }, [currentWorkoutProgram?.weeks]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!currentWorkoutProgram) {
        return <div>No Workout Program Found.</div>
    }

    const handleAddWeek = async () => {
        try {
            const response = await fetch(`/api/weeks/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workoutProgramId })
            });

            if (response.ok) {
                const newWeek = await response.json();
                setWeeks(prevWeeks => [...prevWeeks, newWeek]);
            } else {
                const data = await response.json();
                console.error('Failed to add new week:', data.message);
            }
        } catch (error) {
            console.error('Error adding new week:', error);
        } finally {
            //Re-enable add week button
            setIsAddingWeek(false);
        }
    };

    const handleDeleteWeek = async () => {
        try {
            const response = await fetch(`/api/weeks/${weekToDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setWeeks(prevWeeks => prevWeeks.filter(week => week.id !== weekToDelete));
            } else {
                console.log('Failed to delete the week');
            }
        } catch (error) {
            console.error('Error deleting week:', error);
        } finally {
            closeModal();
        }
    };

    const openDeleteModal = (weekId) => {
        setWeekToDelete(weekId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWeekToDelete(null);
    };

    const handleToggleRestDay = (weekIndex, dayIndex) => {
        const updatedWeeks = [...weeks];
        const updatedDay = { ...updatedWeeks[weekIndex].days[dayIndex], restDay: !updatedWeeks[weekIndex].days[dayIndex].restDay };
        updatedWeeks[weekIndex].days[dayIndex] = updatedDay;
        setWeeks(updatedWeeks);

        fetch(`/api/days/${updatedDay.id}/rest`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    const isOwner = currentUser?.id === currentWorkoutProgram?.userId

    return (
        <div className="page-container workout-programs-details">
            <div className="information-container">
                <h1>{currentWorkoutProgram.programName}</h1>
                <img title={currentWorkoutProgram.programName} src={currentWorkoutProgram.workoutImageUrl} alt={currentWorkoutProgram.programName}/>
                <p>Created By: {currentWorkoutProgram.creatorUsername}</p>
                <div className="description-container">
                    <p>Description of the program:</p>
                    <p>{currentWorkoutProgram.description}</p>
                </div>
            </div>

            <div className="weeks-container">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex}>
                        <div className="week-title">
                            <h1>Week {weekIndex + 1}</h1>

                            {isOwner && (
                                <button
                                    type="button"
                                    onClick={() => openDeleteModal(week.id)}
                                    className="remove-week-button">
                                        Remove Week
                                </button>
                            )}
                        </div>

                        <div className="days-container">
                            {week.days.map((day, dayIndex) => (
                                <DayCard
                                    key={day.id}
                                    day={day}
                                    isOwner={isOwner}
                                    weekIndex={weekIndex}
                                    dayIndex={dayIndex}
                                    onToggleRestDay={() => handleToggleRestDay(weekIndex, dayIndex)}
                                    />
                            ))}
                        </div>
                    </div>
                ))}
                {isOwner && (
                    <div>
                        <button type="button" onClick={handleAddWeek} className="add-week-button">
                            {isAddingWeek ? 'Adding Week...' : 'Add A Week'}
                        </button>
                    </div>
                )}
            </div>

            <ConfirmingModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDeleteWeek}
                message="Are you sure you want to delete this week? This action cannot be undone."
            />
        </div>
    )
}

export default WorkoutProgramDetailsPage
