import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { DarkModeProvider } from "./Components/Offers/DarkModeContext";
import { AuthProvider } from "./Components/Offers/AuthContext";
import PrivateRoute from "./Containers/UserAuth/PrivateRoute";

import Orders from "./Containers/Offers/Orders";
import OfferDetailsPage from "./Containers/Offers/OfferDetails/OfferDetailsPage";

import LoginPage from "./Containers/UserAuth/Login/LoginPage";
import RegisterPage from "./Containers/UserAuth/Registration/RegisterPage";
import UserProfile from "./Containers/UserAuth/Profile/UserProfile";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DarkModeProvider>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/offer-details/:id" element={<OfferDetailsPage />} />
            <Route path="/profile" element={<PrivateRoute element={<UserProfile />} />} />
          </Routes>
        </DarkModeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
