import React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const MapCancelButton = ({ onCancel, isDarkMode }) => {
  const cancelButtonStyle = {
    position: "absolute",
    top: "130px",
    left: "5px",
    zIndex: 400,
  };

  const cancelIconStyle = {
    fontSize: "32px", 
    color: isDarkMode ? "white" : "#34363a",
  };

  return (
    <div style={cancelButtonStyle} className="map-cancel-button">
      <IconButton onClick={onCancel} color="primary" size="small">
        <CloseIcon style={cancelIconStyle} />
      </IconButton>
    </div>
  );
};

export default MapCancelButton;
