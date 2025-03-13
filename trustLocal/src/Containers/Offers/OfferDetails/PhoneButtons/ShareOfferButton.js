import React from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useDarkMode } from "../../../../Components/Offers/DarkModeContext";

const ShareOfferButton = ({ onCancel }) => {
  const { isDarkMode } = useDarkMode();

  const SendButtonStyle = {
    position: "absolute",
    top: "130px",
    left: "870px",
    zIndex: 400,
  };

  const SendIconStyle = {
    fontSize: "32px", 
    color: "black",
  };

  return (
    <div style={SendButtonStyle} className={`SendIcon-button ${isDarkMode ? "dark-mode" : ""}`}>
      <IconButton color="primary" size="small">
        <SendIcon style={SendIconStyle}/>
      </IconButton>
    </div>
  );
};

export default ShareOfferButton;
