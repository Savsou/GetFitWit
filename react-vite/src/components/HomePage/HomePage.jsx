import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutPrograms } from '../../redux/workoutprogram';

const HomePage = () => {
    const dispatch = useDispatch();
    // Get the workout programs and pagination details for each difficulty level
    const workoutPrograms = useSelector((state) => state.workoutPrograms.workoutPrograms);
    const pagination = useSelector((state) => state.workoutPrograms.pagination);

    useEffect(() => {
        dispatch(fetchWorkoutPrograms('beginner', 1));
        dispatch(fetchWorkoutPrograms('intermediate', 1));
        dispatch(fetchWorkoutPrograms('advanced', 1));
    }, [dispatch]);

    const handlePagination = (difficulty, direction) => {
        const currentPage = pagination[difficulty]?.currentPage || 1;
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        dispatch(fetchWorkoutPrograms(difficulty, newPage));
    };

    if (!workoutPrograms.beginner || !workoutPrograms.intermediate || !workoutPrograms.advanced) {
        return <h1>Loading...</h1>;
    }


    return (

        <div>

            {/* Beginner Programs */}
            <div>
                <h2>Beginner Programs</h2>
                <ul>
                    {workoutPrograms.beginner.map((program) => (
                        <li key={program.id}>{program.programName}</li>
                    ))}
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
                <ul>
                    {workoutPrograms.intermediate.map((program) => (
                        <li key={program.id}>{program.programName}</li>
                    ))}
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
                <ul>
                    {workoutPrograms.advanced.map((program) => (
                        <li key={program.id}>{program.programName}</li>
                    ))}
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
