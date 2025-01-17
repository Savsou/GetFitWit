import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
    const [days, setDays] = useState([]);
    const [isAddingWeek, setIsAddingWeek] = useState(false);
    const [deleteType, setDeleteType] = useState(null);

    useEffect(() => {
        dispatch(fetchWorkoutProgramById(workoutProgramId));
    }, [dispatch, workoutProgramId])

    useEffect(() => {
        if (currentWorkoutProgram?.weeks) {
            setWeeks(currentWorkoutProgram.weeks);
            const allDays = currentWorkoutProgram.weeks.flatMap(week =>
                week.days.map(day => ({ ...day, weekId: week.id }))
            );
            setDays(allDays);
        }
    }, [currentWorkoutProgram?.weeks]);


    if (isLoading || !currentWorkoutProgram) {
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
            await dispatch(fetchWorkoutProgramById(workoutProgramId));
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
            await dispatch(fetchWorkoutProgramById(workoutProgramId));
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

    const handleToggleRestDay = (dayId) => {
        setDays(prevDays =>
            prevDays.map(day =>
                day.id === dayId ? { ...day, restDay: !day.restDay } : day
            )
        );

        fetch(`/api/days/${dayId}/rest`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
    };

    const formattedEquipment = currentWorkoutProgram.equipment
        .map(equipment =>
            equipment.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        )
        .join(', ');

    const groupedDays = weeks.map(week => ({
        ...week,
        days: days.filter(day => day.weekId === week.id),
    }));

    const isOwner = currentUser?.id === currentWorkoutProgram?.userId

    return (
        <div className="workout-programs-details">
            <div className="information-container">
                <div className="workout-program-details-title">
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
                <img className="workout-image" title={currentWorkoutProgram.programName} src={currentWorkoutProgram.workoutImageUrl} alt={currentWorkoutProgram.programName} />
                <p>Equipment: {formattedEquipment}</p>
                <div className="description-container">
                    <p>Description of the program:</p>
                    <p>{currentWorkoutProgram.description}</p>
                </div>
                <div className="created-by-container">
                    <Link to={`/profile/${currentWorkoutProgram.userId}`} className="profile-image-container">
                        <img src={currentWorkoutProgram.profileImageUrl} alt={currentWorkoutProgram.creatorUsername} />
                    </Link>
                    <p>Created By: {currentWorkoutProgram.creatorUsername}</p>
                </div>
                {isOwner && (
                    <button
                        onClick={() => openDeleteModal('program')}
                        className="delete-program-button"
                    >
                        Delete Program
                    </button>
                )}
            </div>

            <div className="weeks-container">
                {groupedDays.map((week, weekIndex) => (
                    <div key={weekIndex}>
                        <div className="week-title">
                            <h1>Week {weekIndex + 1}</h1>
                        </div>
                        {isOwner && (
                            <div className="remove-button-container">
                                <button
                                    type="button"
                                    onClick={() => openDeleteModal('week', week.id)}
                                    className="remove-week-button">
                                    Remove Week
                                </button>
                            </div>
                        )}

                        <div className="days-container">
                            {week.days.map((day) => (
                                <DayCard
                                    key={day.id}
                                    day={day}
                                    isOwner={isOwner}
                                    onToggleRestDay={() => handleToggleRestDay(day.id)}
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
