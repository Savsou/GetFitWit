import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFavorites } from "../../redux/favorites";
import WorkoutProgramCard from "../WorkoutsPrograms/WorkoutProgramCard";
import "./FavoritesPage.css"

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.session.user)

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch])

    if (!user) {
        return <h1>Need to be logged in.</h1>
    }

    return (
        <div className="page-container">
            <h1>Favorites Page</h1>

            {favorites && favorites.length > 0 ? (
                <div className="favorites-card-container">
                    {favorites.map((program) => (
                        <div key={program.id} className="favorite-card">
                            <WorkoutProgramCard program={program} favorites={favorites} />
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="empty-favorite-text">You do not have any workout programs favorited!</h2>
            )}
        </div>
    )
}

export default FavoritesPage
