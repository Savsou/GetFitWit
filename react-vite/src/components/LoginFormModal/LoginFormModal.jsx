import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    if (!email) {
      newErrors.email = "Please enter your email.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    //If any errors, return right away when trying to be submitted
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    //Don't give a detailed reason as to why login has failed.
    if (serverResponse) {
      setErrors({
        general: "Login failed. Please check your credentials and try again.",
      });
    } else {
      closeModal();
      navigate("/");
    }
  };

  const demoUserLogin = async (e) => {
    e.preventDefault();

    setErrors({});

    const serverResponse = await dispatch(
      thunkLogin({
        email: "demoman@example.com",
        password: "hashedpassword1"
      })
    );

    if (serverResponse) {
      setErrors({
        general: "Login failed. Please check your credentials and try again.",
      });
    } else {
      closeModal();
      navigate("/");
    }
  }

  return (
    <>
      <h1 className="modal-title">Log In</h1>
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label-name">Email</label>
          <div className="input-error">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (<p className="error-message">{errors.email}</p>)}
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
            {errors.password && (<p className="error-message">{errors.password}</p>)}
          </div>
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}

        <div className="form-group">
          <button type="submit">Log In</button>
        </div>
        <div className="form-group">
          <button type="button" onClick={demoUserLogin}>
            Demo Login
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
