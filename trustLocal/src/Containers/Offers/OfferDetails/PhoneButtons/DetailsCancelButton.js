import React from "react";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDarkMode } from "../../../../Components/Offers/DarkModeContext";

const DetailsCancelButton = ({ onCancel, showMap }) => {
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cancelButtonStyle = {
    position: "absolute",
    top: isSmallScreen ? "70px" : "130px",
    left: isSmallScreen ? "5px" : "15px",
    zIndex: 400,
  };

  const cancelIconStyle = {
    fontSize: "32px",
    color: isDarkMode ? "white" : "#34363a",
  };

  const navigateBack = () => {
    window.history.back();
  };

  return (
    <div
      style={cancelButtonStyle}
      className={`cancel-button ${isDarkMode ? "dark-mode" : ""}`}
    > 
      {showMap ? (
        <IconButton onClick={onCancel} color="primary" size="small">
          <CloseIcon style={cancelIconStyle}/>
        </IconButton>
      ) : (
        <IconButton onClick={navigateBack} color="primary" size="small">
          <CloseIcon style={cancelIconStyle} />
        </IconButton>
      )}
    </div>
  );
};

export default DetailsCancelButton;
