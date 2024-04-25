import React, { useState } from "react";
import "./LoginPage.css";
import { auth, googleProvider } from "../../firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/weather");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1 className="welcome">Welcome back to Weather App!</h1>
      <form className="login-form" onSubmit={onLogin}>
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="error">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <button onClick={signInWithGoogle} className="google-signup-button">
          <span className="col">
            <FontAwesomeIcon icon={faHeart} className="google-icon" />
          </span>
          Sign in with Google
        </button>
        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <div className="sign">
        <span>Don't have an account yet?</span>
        <NavLink to="/">Sign up</NavLink>
      </div>
    </div>
  );
}

export default LoginPage;