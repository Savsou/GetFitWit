import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkoutDetailsPage = () => {
    const { workoutProgramId } = useParams();

    return (
        <h1>Workout Program</h1>
    )
}

export default WorkoutDetailsPage
