import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutProgramById, deleteWorkoutProgram, fetchWorkoutPrograms } from "../../redux/workoutprogram";
import { useNavigate } from "react-router-dom";
import ConfirmingModal from "../../context/ConfirmingModal";
import DayCard from "../DayCard";
import "./WorkoutProgramDetailsPage.css"

const WorkoutProgramDetailsPage = () => {
    const { workoutProgramId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentWorkoutProgram = useSelector(state => state.workoutPrograms.currentWorkoutProgram);
    const isLoading = useSelector(state => state.workoutPrograms.loading);
    const currentUser = useSelector(state => state.session.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekToDelete, setWeekToDelete] = useState();
    const [weeks, setWeeks] = useState([]);
    const [isAddingWeek, setIsAddingWeek] = useState(false);
    const [deleteType, setDeleteType] = useState(null);

    useEffect(() => {
        dispatch(fetchWorkoutProgramById(workoutProgramId));
    }, [dispatch, workoutProgramId])

    useEffect(() => {
        if (currentWorkoutProgram?.weeks) {
            setWeeks(currentWorkoutProgram.weeks);
        }
    }, [currentWorkoutProgram?.weeks]);


    if (isLoading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

    if (!currentWorkoutProgram) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

    const handleAddWeek = async () => {
        setIsAddingWeek(true);
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

    const openDeleteModal = (type, id = null) => {
        setDeleteType(type);
        if (type === 'week') setWeekToDelete(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setWeekToDelete(null);
    };

    const handleDeleteProgram = async () => {
        const difficulty = currentWorkoutProgram.difficulty;
        await dispatch(deleteWorkoutProgram(workoutProgramId))
        await dispatch(fetchWorkoutPrograms(difficulty, 1));
        closeModal();
        navigate('/');
    }

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

    const formattedEquipments = currentWorkoutProgram.equipments
        .map(equipment =>
            equipment.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        )
        .join(', ');

    const isOwner = currentUser?.id === currentWorkoutProgram?.userId

    return (
        <div className="page-container workout-programs-details">
            <div className="information-container">
                <div>
                    <h1>{currentWorkoutProgram.programName}</h1>
                    {isOwner && (
                        <button
                            onClick={() => navigate(`/workout_programs/${workoutProgramId}/edit`)}
                            className="edit-program-button"
                        >
                            Edit Program
                        </button>
                    )}
                </div>
                <img title={currentWorkoutProgram.programName} src={currentWorkoutProgram.workoutImageUrl} alt={currentWorkoutProgram.programName}/>
                <p>Created By: {currentWorkoutProgram.creatorUsername}</p>
                <p>Equipments: {formattedEquipments}</p>
                <div className="description-container">
                    <p>Description of the program:</p>
                    <p>{currentWorkoutProgram.description}</p>
                </div>
                {isOwner && (
                    <button onClick={() => openDeleteModal('program')}>Delete Program</button>
                )}
            </div>

            <div className="weeks-container">
                {weeks.map((week, weekIndex) => (
                    <div key={weekIndex}>
                        <div className="week-title">
                            <h1>Week {weekIndex + 1}</h1>

                            {isOwner && (
                                <button
                                    type="button"
                                    onClick={() => openDeleteModal('week', week.id)}
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
                onConfirm={deleteType === 'program' ? handleDeleteProgram : handleDeleteWeek}
                message={deleteType === 'program'
                    ? "Are you sure you want to delete this program? This action cannot be undone."
                    : "Are you sure you want to delete this week? This action cannot be undone."
                }
            />
        </div>
    )
}

export default WorkoutProgramDetailsPage
