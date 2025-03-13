import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoadingState } from "../../../Components/Utils/Loading/useLoadingState";
import LoadingBox from "../../../Components/Utils/Loading/LoadingBox";
import Header from "../../../Components/Header/Header";
import success_login from "../../../Components/Static/undraw_completed_m9ci.svg";
import LoginForm from "./LoginForm";
import { useDarkMode } from "../../../Components/Offers/DarkModeContext";
import { Snackbar, SnackbarContent } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useMediaQuery, useTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useAuth } from "../../../Components/Offers/AuthContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const theme = useTheme();
  const { isDarkMode } = useDarkMode();
  const { loading, setLoading } = useLoadingState();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isError, setIsError] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
  
    const requestBody = {
      email: email,
      password: password,
    };
  
    try {
      const response = await fetch(`http://192.168.1.114:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.token) {
        setIsSnackbarOpen(true);
        setIsError(false);
  
        document.cookie = `token=${data.token}; path=/; secure; httpOnly`;
  
        login(data.user, data.token);
  
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setIsSnackbarOpen(true);
        setIsError(true);
      }
    } catch (error) {
      setIsSnackbarOpen(true);
      setIsError(true);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // I will have to facebook login eventually
  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(
        function (response) {
          if (response.authResponse) {
            setIsSnackbarOpen(true);
            setIsError(false);
  
            const fbAccessToken = response.authResponse.accessToken;
  
            login({ facebookAccessToken: fbAccessToken });

            setTimeout(() => {
              navigate("/");
            }, 3000);
          } else {
            setIsSnackbarOpen(true);
            setIsError(true);
          }
        },
        { scope: "email" }
      );
    } else {
      setIsSnackbarOpen(true);
      setIsError(true);
    }
  };  

  useEffect(() => {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1068119421020197',
        cookie: true,
        xfbml: true,
        version: 'v13.0'
      });

      if (window.FB && window.FB.AppEvents) {
        window.FB.AppEvents.logPageView();
      } else {
        console.error("Facebook SDK or AppEvents is not available.");
      }
    };
  }, []);

  return (
    <div>
      <Header activeTab={1} isSmallScreen={isSmallScreen} />
        <div className={`login-container ${isDarkMode ? "dark-mode" : ""}`}>
          {isAuthenticated ? (
            <div className="authenticated-content"> 
              <div className={`login-title ${isDarkMode ? "dark-mode" : ""}`}>
                Welcome Back!
              </div>
              <img 
                src={success_login} 
                alt="success_login" 
                style={{ height: '300px' }} />
            </div> 
          ) : (
            <div>
              <div className={`login-title ${isDarkMode ? "dark-mode" : ""}`}>
                Sign In
              </div>
              {loading ? (
                <LoadingBox height={"152px"} />
              ) : isAuthenticated ? (
                <></>
              ) : (
                <LoginForm
                  isDarkMode={isDarkMode}
                  loading={loading}
                  onLogin={handleLogin}
                  handleFacebookLogin={handleFacebookLogin}
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
              : "Login successful!"
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

export default LoginPage;
