import React from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const SmallMuiBox = styled(Box)({
  left: 0,
  right: 0,
  width: 88,
  bottom: 24,
  margin: "0 auto",
  display: "flex",
  position: "fixed",
});

const CustomButton = styled(Button)({
  backgroundColor: "#0095ff",
  color: "#ffffff",
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "20px",
});

const CustomMapOutlinedIcon = styled(MapOutlinedIcon)({
  width: "24px",
  height: "24px",
});

const MuiBoxMap = ({ onClick }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const renderButton = () => {
    if (isSmallScreen) {
      return (
        <CustomButton variant="contained" disableRipple onClick={onClick}>
          <CustomMapOutlinedIcon />
          <label>Mapa</label>
        </CustomButton>
      );
    }
    return null;
  };

  return <SmallMuiBox>{renderButton()}</SmallMuiBox>;
};

export default MuiBoxMap;
