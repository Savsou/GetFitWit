import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkoutProgramById, updateWorkoutProgram } from "../../redux/workoutprogram";
import ConfirmationModal from "../../context/ConfirmationModal";
import "./CreateWorkoutProgram.css";

const EditWorkoutProgram = () => {
    const { workoutProgramId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentWorkoutProgram = useSelector(state => state.workoutPrograms.currentWorkoutProgram);
    const [programName, setProgramName] = useState('');
    const [oldDifficulty, setOldDifficulty] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [types, setTypes] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [description, setDescription] = useState('');
    const [workoutImageUrl, setWorkoutImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [showConfirmModal, setShowConfirmModal] = useState(false);

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

    useEffect(() => {
        dispatch(fetchWorkoutProgramById(workoutProgramId));
    }, [dispatch, workoutProgramId])

    useEffect(() => {
        if (currentWorkoutProgram) {
            setProgramName(currentWorkoutProgram.programName || '');
            setDifficulty(currentWorkoutProgram.difficulty || '');
            setOldDifficulty(currentWorkoutProgram.difficulty || '');
            setTypes(currentWorkoutProgram.types || []);
            setEquipments(currentWorkoutProgram.equipments || []);
            setDescription(currentWorkoutProgram.description || '');
            setPreviewImage(currentWorkoutProgram.workoutImageUrl || null);
        }
    }, [currentWorkoutProgram]);

    useEffect(() => {
        return () => {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    if (!currentWorkoutProgram) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

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
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("programName", programName);
        formData.append("difficulty", difficulty);
        types.forEach(type => formData.append("types", type));
        equipments.forEach(equipment => formData.append("equipments", equipment));
        formData.append("description", description);

        if (workoutImageUrl) {
            formData.append("workoutImageUrl", workoutImageUrl);
        }

        const serverResponse = await dispatch(updateWorkoutProgram(workoutProgramId, formData, oldDifficulty));

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            setShowConfirmModal(true);
        }
    };



    return (
        <div className="page-container create-program">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-workout-program-form">
                <div className="create-workout-program-container">
                    <h1 className="workout-form-header">Edit Workout Program</h1>

                    <div className="input-group">
                        <label>Program Name:
                            <input
                                type="text"
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                                placeholder="Program Name"
                            />
                        </label>
                        {errors.programName && <span className="error-message">{errors.programName}</span>}
                    </div>

                    <div className="input-group">
                        <label>Difficulty:
                            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
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
                        <label>Equipments:</label>
                        <div className="checkbox-group">
                            {EQUIPMENT_CHOICES.map(({ value, label }) => (
                                <label key={value}>
                                    <input
                                        type="checkbox"
                                        value={value}
                                        checked={equipments.includes(value)}
                                        onChange={(e) => handleCheckboxChange(e, setEquipments)}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                        {errors.equipments && <span className="error-message">{errors.equipments}</span>}
                    </div>

                    <div className="input-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter a description"
                        />
                        {errors.description && <span className="error-message">{errors.description}</span>}
                    </div>

                    <div className="input-group">
                        <button type="button" onClick={handleFileClick}>Upload Image</button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        {previewImage && (
                            <div>
                                <img
                                    src={previewImage}
                                    alt="Workout Preview"
                                    style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
                                />
                                <button onClick={handleClearFile}>Remove</button>
                            </div>
                        )}
                        {errors.workoutImageUrl && <span className="error-message">{errors.workoutImageUrl}</span>}
                    </div>

                    <div className="submission-buttons">
                        <button
                            type="submit"
                            className="submit-button">
                            Update
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
                        setShowConfirmModal(false);
                        navigate('/');
                    }}
                    message="You have updated the workout program!"
                />
            )}
        </div>
    );
};

export default EditWorkoutProgram;