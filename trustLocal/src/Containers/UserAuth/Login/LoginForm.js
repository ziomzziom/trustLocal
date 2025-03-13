import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FacebookIcon from '@mui/icons-material/Facebook';
import fingerprint_login from "../../../Components/Static/undraw_fingerprint_login_re_t71l.svg";

const LoginForm = ({ isDarkMode, onLogin, loading, handleFacebookLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await onLogin(email, password);
  };

  return (
    <div className="login-content-container">
      <div className="login-content">
        <form className="input-form" onSubmit={handleFormSubmit}>
          <div className="input-container">
            <EmailIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
          <div className="input-container">
            <LockIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            Sign In
          </button>
          <div className={`signup-link ${isDarkMode ? "dark-mode" : ""}`}>
            Don't have an account? <Link to="/register">Sign up</Link>
          </div>
          <div className="facebook-login-button">
            <IconButton onClick={handleFacebookLogin} className="facebook-button" >
              <FacebookIcon fontSize="large" />
            </IconButton>
          </div>
        </form>
      </div>
      
      <div className="fingerprint-image-wrapper">
        <img
          src={fingerprint_login}
          alt="fingerprint_image"
          style={{ height: '400px' }} 
        />
      </div>
    </div>
  );
};

export default LoginForm;
