import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { useLoadingState } from "../../../Components/Utils/Loading/useLoadingState";
import LoadingBox from "../../../Components/Utils/Loading/LoadingBox";
import { Snackbar, SnackbarContent } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useMediaQuery, useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Header from "../../../Components/Header/Header";
import RegisterForm from "./RegisterForm";
import success_login from "../../../Components/Static/undraw_completed_m9ci.svg";
import { useDarkMode } from "../../../Components/Offers/DarkModeContext";
import { useAuth } from "../../../Components/Offers/AuthContext";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const theme = useTheme();
  const { isDarkMode } = useDarkMode();
  const { loading, setLoading } = useLoadingState();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isError, setIsError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); 
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (firstName, lastName, email, password, confirmPassword, phoneNumber) => {
    setLoading(true);

    if (password !== confirmPassword) {
      setIsError(true);
      setLoading(false);
      return;
    }

    const requestBody = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber
    };

    try {
      const response = await fetch(`http://192.168.1.114:3000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setIsSnackbarOpen(true);
        setIsError(false);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setIsSnackbarOpen(true);
        setIsError(true);
      }
    } catch (error) {
      setIsSnackbarOpen(true);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header isSmallScreen={isSmallScreen} />
        <div className={`register-container ${isDarkMode ? "dark-mode" : ""}`}>
          {registrationSuccess ? (
            <div className="authenticated-content"> 
              <div className={`register-title ${isDarkMode ? "dark-mode" : ""}`}>
                You are being redirected to the login page.
              </div>
              <img 
                src={success_login} 
                alt="success_login" 
                style={{ height: '300px' }} />
            </div> 
          ) : (
            <div>
              <div className={`login-title ${isDarkMode ? "dark-mode" : ""}`}>
                Register
              </div>
              {loading ? (
                <LoadingBox height={"152px"} />
              ) : isAuthenticated ? (
                <></>
              ) : (
                <RegisterForm 
                  loading={loading} 
                  setLoading={setLoading} 
                  isDarkMode={isDarkMode} 
                  setIsSnackbarOpen={setIsSnackbarOpen} 
                  setIsError={setIsError} 
                  onRegister={handleRegister} 
                />
              )}
            </div>
          )}
        </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <SnackbarContent
          message={
            isError
              ? "An error occurred. Please try again later."
              : "Registration successful!"
          }
          style={{
            backgroundColor: isError ? red[600] : green[600],
          }}
          action={
            isError ? (
              <ErrorOutlineIcon style={{ color: "white" }} />
            ) : (
              <CheckCircleOutlineIcon style={{ color: "white" }} />
            )
          }
        />
      </Snackbar>
    </div>
  );
};

export default RegisterPage;