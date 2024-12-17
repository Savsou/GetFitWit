import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutProgramById } from "../../redux/workoutprogram";
import ConfirmingModal from "../../context/ConfirmingModal";

const WorkoutProgramDetailsPage = () => {
    const { workoutProgramId } = useParams();
    const dispatch = useDispatch();
    const currentWorkoutProgram = useSelector(state => state.workoutPrograms.currentWorkoutProgram);
    const isLoading = useSelector(state => state.workoutPrograms.loading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weekToDelete, setWeekToDelete] = useState();

    // console.log("workout program", currentWorkoutProgram)
    // console.log("Weeks", currentWorkoutProgram.weeks)

    useEffect(() => {
        // Clear the current workout program before loading a new one
        dispatch(fetchWorkoutProgramById(workoutProgramId));
    }, [dispatch, workoutProgramId])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!currentWorkoutProgram) {
        return <div>No Workout Program Found.</div>
    }

    const handleDeleteWeek = async () => {
        try {
            const response = await fetch(`/api/weeks/${weekToDelete}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Successfully deleted the week');
                dispatch(fetchWorkoutProgramById(workoutProgramId));
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

    return (
        <div className="page-container">
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
                {currentWorkoutProgram.weeks.map((week, index) => (
                    <div key={index}>
                        <div className="week-title">
                            <h1>Week {index + 1}</h1>
                            <button type="button" onClick={() => openDeleteModal(week.id)}>Remove This Week</button>
                        </div>
                    </div>
                ))}
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
