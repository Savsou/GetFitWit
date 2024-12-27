import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import "./UserProfilePage.css";

const UserProfilePage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUser(data);
            } catch (e) {
                console.error("Error fetching user:", e)
            }
        }

        fetchUser();
    }, [userId]);

    if (!user) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

    const handleEditProfile = () => {
        alert("Coming Soon")
    }

    return (
        <div className='page-container'>
            <div className="profile-information-container">
                <div className="profile-image-container">
                    <img src={user.profileImage} alt={user.username} />
                </div>
                <div className="profile-information">
                    <h1>{user.username}</h1>
                    <p>{user.bio}</p>
                    <button onClick={handleEditProfile} className="edit-profile-button">Edit Profile</button>
                </div>
            </div>
            <div className="user-workout-programs-container">
                <h2>Workout Programs Made</h2>
            </div>
        </div>
    )
}

export default UserProfilePage;
