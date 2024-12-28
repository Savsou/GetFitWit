import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

function SignupFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Password does not match.",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
        confirm_password: confirmPassword,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/');
    }
  };

  return (
    <>
      <h1 className="modal-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-name">Email</label>
          <div className="input-error">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="label-name">Username</label>
          <div className="input-error">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error-message">{errors.username}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="label-name">Password</label>
          <div className="input-error">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
        </div>

        <div className="form-group">
          <label className="label-name">Confirm Password</label>
          <div className="input-error">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
