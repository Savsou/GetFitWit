import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addFavorite, deleteFavorite } from '../../redux/favorites';
import './WorkoutProgramCard.css'

const WorkoutProgramCard = ({ program, favorites }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const isFavorite = Array.isArray(favorites) && favorites.some((favorite) => favorite.id === program.id);

    const toggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            dispatch(deleteFavorite(program.id));
        } else {
            dispatch(addFavorite(program.id));
        }
    }

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
            {user && (
                <div className="favorite-icon-container" onClick={toggleFavorite}>
                    <FontAwesomeIcon
                        icon={isFavorite ? faSolidStar : faRegularStar}
                        className={`favorite-icon ${isFavorite ? 'filled-star' : 'outlined-star'}`}
                        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    />
                </div>
            )}
        </Link>
    )
}

export default WorkoutProgramCard
