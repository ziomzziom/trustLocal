import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Components/Offers/AuthContext";
import UserProfile from "./Profile/UserProfile";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <UserProfile {...rest} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
