import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingBox = ({ height, width }) => {
  const loadingBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: height,
    width: width,
    animation: "fadeIn 0.8s ease-in-out",
  };

  const loadingCircleStyle = {
    animation: "rotate 0.8s linear infinite",
    color: "#CF3C2C",
  };


  return (
    <Box style={loadingBoxStyle}>
      <CircularProgress style={loadingCircleStyle} size={40} thickness={5} />
    </Box>
  );
};

export default LoadingBox;
