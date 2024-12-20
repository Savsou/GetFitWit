import { Link } from 'react-router-dom';
import './WorkoutProgramCard.css'

const WorkoutProgramCard = ({program}) => {

    //Capitalize the first letter in Difficulty
    const formattedDifficulty = program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1);

    // Capitalize each word in Types
    const formattedTypes = program.types
        .map(type =>
            type.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        )
        .join(', ');

    // Capitalize each word in Equipments
    const formattedEquipments = program.equipments
        .map(equipment =>
            equipment.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
        )
        .join(', ');

    return (
        <Link to={`/workout_programs/${program.id}`} className='workout-card'>
            <img src={program.workoutImageUrl} alt={program.programName} />
            <div className='workout-information'>
                <h3>{program.programName}</h3>
                <p>Difficulty: {formattedDifficulty}</p>
                <p>Type: {formattedTypes}</p>
                <p>Equipments: {formattedEquipments}</p>
            </div>
        </Link>
    )
}

export default WorkoutProgramCard
