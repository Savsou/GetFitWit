import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from "react-redux";
import logo from "../../../logo.png"
import "./Navigation.css";

function Navigation() {
  const user = useSelector((store) => store.session.user);

  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li className="nav-logo">
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo"/>
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <ProfileButton />
            </li>
          </>
        ) : (
          <>
            <li className="nav-right">
              <OpenModalMenuItem
                itemText="Log In"
                modalComponent={<LoginFormModal />}
                buttonClass="login-button"
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                modalComponent={<SignupFormModal />}
                buttonClass="signup-button"
                />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
