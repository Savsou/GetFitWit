import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutProgramDetailsPage = () => {
    const { workoutProgramId } = useParams();

    return (
        <div className="page-container">
            <h1>Workout Program</h1>
        </div>
    )
}

export default WorkoutProgramDetailsPage
