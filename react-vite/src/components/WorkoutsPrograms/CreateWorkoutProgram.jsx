import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWorkoutProgram } from "../../redux/workoutprogram";
import "./CreateWorkoutProgram.css";
import ConfirmationModal from "../../context/ConfirmationModal";
import { WORKOUT_TYPES, EQUIPMENT_CHOICES, DIFFICULTY_CHOICES } from "./ChoiceHelpers";

const CreateWorkoutProgram = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [programName, setProgramName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [types, setTypes] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [description, setDescription] = useState('');
    const [workoutImageUrl, setWorkoutImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleFileClick = (e) => {
        e.preventDefault();

        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setWorkoutImageUrl(file);
            const previewURL = URL.createObjectURL(file);
            setPreviewImage(previewURL);
        }
    };

    const handleClearFile = () => {
        fileInputRef.current.value = '';
        setWorkoutImageUrl(null);
        setPreviewImage(null);
    };

    const handleCheckboxChange = (e, setState) => {
        const { value, checked } = e.target;
        setState(prevState =>
            checked ? [...prevState, value] : prevState.filter(item => item !== value)
        );
    };

    const handleCancel = () => {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("programName", programName);
        formData.append("difficulty", difficulty);
        //Send each type and equipment separately
        types.forEach(type => formData.append("types", type));
        equipment.forEach(equipment => formData.append("equipment", equipment));
        formData.append("description", description);

        if (workoutImageUrl) {
            formData.append("workoutImageUrl", workoutImageUrl);
        }

        const serverResponse = await dispatch(addWorkoutProgram(formData));

        if (serverResponse.error) {
            setErrors(serverResponse)
        } else {
            setShowConfirmModal(true);
            setProgramName('');
            setDifficulty('');
            setTypes([]);
            setEquipment([]);
            setDescription('');
            setWorkoutImageUrl(null);
            setPreviewImage(null);
            setErrors({});

            navigate(`/workout_programs/${serverResponse.id}`);
        }
    }

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    return (
        <div className="page-container create-program">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-workout-program-form">
                <div className="create-workout-program-container">
                    <h1 className="workout-form-header">Create A New Workout Program</h1>

                    <div className="input-group">
                        <label>
                            Program Name:
                            <input
                                type="text"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                                placeholder="Program Name"
                                className="program-name"
                            />
                        </label>
                        {errors.programName && <span className="error-message">{errors.programName}</span>}
                    </div>

                    <div className="input-group">
                        <label>
                            Difficulty:
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                {DIFFICULTY_CHOICES.map(({ value, label }) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                        {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
                    </div>

                    <div className="input-group">
                        <label>Workout Types:</label>
                        <div className="checkbox-group">
                            {WORKOUT_TYPES.map(({ value, label }) => (
                                <label key={value}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={types.includes(value)}
                                        onChange={(e) => handleCheckboxChange(e, setTypes)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        {errors.types && <span className="error-message">{errors.types}</span>}
                    </div>

                    <div className="input-group">
                        <label>Equipment:</label>
                        <div className="checkbox-group">
                            {EQUIPMENT_CHOICES.map(({ value, label }) => (
                                <label key={value}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={equipment.includes(value)}
                                        onChange={(e) => handleCheckboxChange(e, setEquipment)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        {errors.equipment && <span className="error-message">{errors.equipment}</span>}
                    </div>

                    <div className="input-group">
                        <label>Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a description (optional)"
                        >
                        </textarea>
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="input-group">
                        <button type="button" onClick={handleFileClick}>Upload Image</button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />

                        {previewImage && (
                            <div>
                                <h3>Image Preview:</h3>
                                <img
                                    src={previewImage}
                                    alt="Workout Preview"
                                    style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                                />
                                <button type="button" onClick={handleClearFile}>Remove Image</button>
                            </div>
                        )}
                        {errors.workoutImageUrl && <span className="error-message">{errors.workoutImageUrl}</span>}
                    </div>

                    <div className="submission-buttons">
                        <button
                            type="submit"
                            className="submit-button">
                            Create
                        </button>
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>

            {showConfirmModal && (
                <ConfirmationModal
                    onClose={() => {
                        setShowConfirmModal(false)
                        navigate('/');
                    }}
                    message={"You have created a workout program!"}
                />
            )}

        </div>
    )
}

export default CreateWorkoutProgram
