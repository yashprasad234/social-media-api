import axios from "axios";
import "./register.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:3000/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              type="text"
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              type="email"
              className="registerInput"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              type="password"
              className="registerInput"
              minLength={6}
            />
            <input
              placeholder="Confirm Password"
              required
              ref={confirmPassword}
              type="password"
              className="registerInput"
            />
            <button className="registerButton">Sign Up</button>
            <button className="registerLoginButton">Log Into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
