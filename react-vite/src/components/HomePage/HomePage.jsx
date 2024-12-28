import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutPrograms, resetCurrentWorkoutProgram } from '../../redux/workoutprogram';
import { fetchFavorites, loadFavorites } from '../../redux/favorites';
import WorkoutProgramCard from '../WorkoutsPrograms/WorkoutProgramCard'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const favorites = useSelector((state) => state.favorites)
    // Get the workout programs and pagination details for each difficulty level
    const workoutPrograms = useSelector((state) => state.workoutPrograms.workoutPrograms);
    const pagination = useSelector((state) => state.workoutPrograms.pagination);
    const [localLoading, setLocalLoading] = useState(true);

    //When switching back to the homepage, make sure it loads everything before showing the page and reset the current Workout Program state
    useEffect(() => {
        const fetchData = async () => {
            dispatch(resetCurrentWorkoutProgram());
            await Promise.all([
                dispatch(fetchWorkoutPrograms('beginner', 1)),
                dispatch(fetchWorkoutPrograms('intermediate', 1)),
                dispatch(fetchWorkoutPrograms('advanced', 1)),
            ]);
            setLocalLoading(false);
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(fetchFavorites());
        } else {
            dispatch(loadFavorites([]));
        }
    }, [dispatch, user]);

    const handlePagination = (difficulty, direction) => {
        const currentPage = pagination[difficulty]?.currentPage || 1;
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        dispatch(fetchWorkoutPrograms(difficulty, newPage));
    };

    if (localLoading || !workoutPrograms.beginner || !workoutPrograms.intermediate || !workoutPrograms.advanced) {
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
                            <WorkoutProgramCard key={program.id} program={program} favorites={favorites} />
                        ))}
                    </div>
                </ul>
                <div className='pagination-container'>
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
            </div>

            {/* Intermediate Programs */}
            <div>
                <h2>Intermediate Programs</h2>
                <ul className='workout-programs-list'>
                    <div className='workout-card-container'>
                        {workoutPrograms.intermediate.map((program) => (
                            <WorkoutProgramCard key={program.id} program={program} favorites={favorites} />
                        ))}
                    </div>
                </ul>
                <div className='pagination-container'>
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
            </div>

            {/* Advanced Programs */}
            <div>
                <h2>Advanced Programs</h2>
                <ul className='workout-programs-list'>
                    <div className='workout-card-container'>
                        {workoutPrograms.advanced.map((program) => (
                            <WorkoutProgramCard key={program.id} program={program} favorites={favorites} />
                        ))}
                    </div>
                </ul>
                <div className='pagination-container'>
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

        </div>
    );
};

export default HomePage;
