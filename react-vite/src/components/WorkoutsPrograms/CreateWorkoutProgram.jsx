import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addWorkoutProgram } from "../../redux/workoutprogram";
import "./CreateWorkoutProgram.css";

const CreateWorkoutProgram = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [programName, setProgramName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [types, setTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [description, setDescription] = useState('');
    const [workoutImageUrl, setWorkoutImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    const WORKOUT_TYPES = [
        { value: 'full_body', label: 'Full Body' },
        { value: 'cardio', label: 'Cardio' },
        { value: 'strength', label: 'Strength' },
        { value: 'abs', label: 'Abs' },
        { value: 'chest', label: 'Chest' },
        { value: 'arms', label: 'Arms' },
        { value: 'legs', label: 'Legs' },
        { value: 'back', label: 'Back' },
        { value: 'shoulders', label: 'Shoulders' },
    ];

    const EQUIPMENT_CHOICES = [
        { value: 'none', label: 'None' },
        { value: 'dumbbells', label: 'Dumbbells' },
        { value: 'mat', label: 'Mat' },
        { value: 'barbell', label: 'Barbell' },
        { value: 'kettlebell', label: 'Kettlebell' },
        { value: 'resistance_band', label: 'Resistance Band' },
        { value: 'bench', label: 'Bench' },
    ];

    const DIFFICULTY_CHOICES = [
        { value: '', label: 'Select Difficulty' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ];

    const handleFileClick = () => {
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("programName", programName);
        formData.append("difficulty", difficulty);
        formData.append("types", types);
        formData.append("equipments", equipments);
        formData.append("description", description);

        if (workoutImageUrl) {
            formData.append("workoutImageUrl", workoutImageUrl);
        }

        const serverResponse = await dispatch(addWorkoutProgram(formData));

        if (serverResponse) {
            setErrors(serverResponse)
        } else {
            setProgramName('');
            setDifficulty('');
            setTypes([]);
            setEquipments([]);
            setDescription('');
            setWorkoutImageUrl(null);
            setPreviewImage(null);
            setErrors({});
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
        <div className="page-container">
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
                        {errors.programName && <span className="error">{errors.programName}</span>}
                    </div>

                    <div className="input-group">
                        <label>
                            Difficulty:
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                {DIFFICULTY_CHOICES.map (({value, label}) => (
                                    <option key={value} value={value}>{label}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="input-group">
                        <label>Workout Types:</label>
                        {WORKOUT_TYPES.map(({ value, label }) => (
                            <label key={value}>
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={(e) => handleCheckboxChange(e, setTypes)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>

                    <div className="input-group">
                        <label>Equipments:</label>
                        {EQUIPMENT_CHOICES.map(({ value, label }) => (
                            <label key={value}>
                                <input
                                    type="checkbox"
                                    value={value}
                                    onChange={(e) => handleCheckboxChange(e, setEquipments)}
                                />
                                {label}
                            </label>
                        ))}
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
                    </div>

                    <div className="input-group">
                        <button onClick={handleFileClick}>Upload Image</button>
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
                                <button onClick={handleClearFile}>Remove Image</button>
                            </div>
                        )}
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
        </div>
    )
}

export default CreateWorkoutProgram
