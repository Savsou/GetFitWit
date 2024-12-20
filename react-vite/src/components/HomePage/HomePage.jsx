import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutPrograms, resetCurrentWorkoutProgram } from '../../redux/workoutprogram';
import WorkoutProgramCard from '../WorkoutsPrograms/WorkoutProgramCard'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch();
    // Get the workout programs and pagination details for each difficulty level
    const workoutPrograms = useSelector((state) => state.workoutPrograms.workoutPrograms);
    const pagination = useSelector((state) => state.workoutPrograms.pagination);
    const isLoading = useSelector(state => state.workoutPrograms.loading);

    useEffect(() => {
        dispatch(resetCurrentWorkoutProgram());
        dispatch(fetchWorkoutPrograms('beginner', 1));
        dispatch(fetchWorkoutPrograms('intermediate', 1));
        dispatch(fetchWorkoutPrograms('advanced', 1));
    }, [dispatch]);

    const handlePagination = (difficulty, direction) => {
        const currentPage = pagination[difficulty]?.currentPage || 1;
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        dispatch(fetchWorkoutPrograms(difficulty, newPage));
    };

    if (isLoading || !workoutPrograms.beginner || !workoutPrograms.intermediate || !workoutPrograms.advanced) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }


    return (

        <div className='page-container'>

            {/* Beginner Programs */}
            <div>
                <h2>Beginner Programs</h2>
                <ul className='workout-programs-list'>
                    <div className='workout-card-container'>
                        {workoutPrograms.beginner.map((program) => (
                            <WorkoutProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                </ul>
                <button
                    onClick={() => handlePagination('beginner', 'prev')}
                    disabled={pagination.beginner?.currentPage === 1}
                >
                    Prev
                </button>
                <button
                    onClick={() => handlePagination('beginner', 'next')}
                    disabled={pagination.beginner?.currentPage === pagination.beginner?.totalPages}
                >
                    Next
                </button>
            </div>

            {/* Intermediate Programs */}
            <div>
                <h2>Intermediate Programs</h2>
                <ul className='workout-programs-list'>
                    <div className='workout-card-container'>
                        {workoutPrograms.intermediate.map((program) => (
                            <WorkoutProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                </ul>
                <button
                    onClick={() => handlePagination('intermediate', 'prev')}
                    disabled={pagination.intermediate?.currentPage === 1}
                >
                    Prev
                </button>
                <button
                    onClick={() => handlePagination('intermediate', 'next')}
                    disabled={
                        pagination.intermediate?.currentPage ===
                        pagination.intermediate?.totalPages
                    }
                >
                    Next
                </button>
            </div>

            {/* Advanced Programs */}
            <div>
                <h2>Advanced Programs</h2>
                <ul className='workout-programs-list'>
                    <div className='workout-card-container'>
                        {workoutPrograms.advanced.map((program) => (
                            <WorkoutProgramCard key={program.id} program={program} />
                        ))}
                    </div>
                </ul>
                <button
                    onClick={() => handlePagination('advanced', 'prev')}
                    disabled={pagination.advanced?.currentPage === 1}
                >
                    Prev
                </button>
                <button
                    onClick={() => handlePagination('advanced', 'next')}
                    disabled={pagination.advanced?.currentPage === pagination.advanced?.totalPages}
                >
                    Next
                </button>
            </div>

        </div>
    );
};

export default HomePage;
