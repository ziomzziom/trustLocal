import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import fingerprint_login from "../../../Components/Static/undraw_fingerprint_login_re_t71l.svg";

const RegisterForm = ({ 
  loading, 
  setLoading, 
  isDarkMode, 
  setIsError, 
  onRegister 
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState("22"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setIsError(true);
      alert("Passwords do not match!");
      return;
    }
  
    setLoading(true); 
  
    const fullPhoneNumber = `+${countryCode}${phoneNumber}`;
  
    onRegister(firstName, lastName, email, password, confirmPassword, fullPhoneNumber);
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setCountryCode(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    setPhoneNumber(value);
  };

  return (
    <div className="login-content-container">
      <div  className="login-content">
        <form noValidate className={`register-form ${isDarkMode ? "dark-mode" : ""}`} onSubmit={handleFormSubmit}>
          <div className="register-input-container">
            <PersonIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
          <div className="register-input-container">
            <EmailIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
         <div className="register-input-container">
          <LocalPhoneIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
          <div style={{ display: "flex", gap: "5px", width: "100%" }}>
            <div className={`country-code-wrapper ${isDarkMode ? "dark-mode" : ""}`} >
              <span style={{ fontSize: "16px", paddingRight: "5px" }}>+</span>
              <input
                type="text"
                value={countryCode}
                onChange={handleCountryCodeChange}
                maxLength="3"
                className={`register-form-input country-code ${isDarkMode ? "dark-mode" : ""}`}
                style={{ width: "50px", textAlign: "center" }}
              />
            </div>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className={`register-form-input phone-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
        </div>
          <div className="register-input-container">
            <LockIcon className={`signin-icon ${isDarkMode ? "dark-mode" : ""}`} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
            <input
              type="password"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`register-form-input ${isDarkMode ? "dark-mode" : ""}`}
            />
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            Register
          </button>
          <div className={`signup-link ${isDarkMode ? "dark-mode" : ""}`}>
            Already have an account? <Link to="/login">Sign In</Link>
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

export default RegisterForm;
