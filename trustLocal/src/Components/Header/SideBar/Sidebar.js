import React, { useState } from "react";
import { Button, IconButton, Drawer, Avatar, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { useDarkMode } from "../../Offers/DarkModeContext";
import { useAuth } from "../../Offers/AuthContext";
import { Link } from "react-router-dom";
import SidebarList from "./SidebarList";
import "./SideBar.scss";

const Sidebar = ({ open, onClose, onAddNewOfferClick }) => {
  const { isDarkMode } = useDarkMode();
  const { isAuthenticated, logout, user, loading } = useAuth(); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (loading) {
    return null; // Or a loading spinner
  }

  const handleLogout = () => {
    setSnackbarOpen(true);
    logout();
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Drawer className="sidebar" anchor="right" open={open} onClose={onClose} style={{ width: "360px" }}>
      <div className={`sidebar-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
        <div className={`sidebar-header ${isDarkMode ? "dark-mode" : ""}`}>
          <h2 className={`sidebar-title ${isDarkMode ? "dark-mode" : ""}`}>
            MENU
          </h2>
          <IconButton
            onClick={onClose}
            className={`sidebar-close-button ${isDarkMode ? "dark-mode" : ""}`}
          >
            <CloseIcon className="sidebar-close-icon" />
          </IconButton>
        </div>

        <SidebarList
          isAuthenticated={isAuthenticated}
          onClose={onClose}
          isDarkMode={isDarkMode}
          onAddNewOfferClick={onAddNewOfferClick}
        />

        <div className={`sidebar-footer ${isDarkMode ? "dark-mode" : ""}`}>
          {isAuthenticated ? (
            <>
              <Button
                onClick={handleLogout}
                className={`sidebar-footer-button ${isDarkMode ? "dark-mode" : ""}`}
                startIcon={<LogoutIcon className={`sidebar-footer-button-icon ${isDarkMode ? "dark-mode" : ""}`} />}
              >
                Logout
              </Button>

              <div className={`sidebar-user-section ${isDarkMode ? "dark-mode" : ""}`}>
                <Link to="/profile">
                  <Avatar
                    src={user && user.profilePictureUrl}
                    style={{
                      backgroundColor: isDarkMode
                        ? "var(--color-tag-background-light)"
                        : "var(--color-tag-background-dark)",
                    }}
                    className="sidebar-header-avatar"
                  />
                </Link>
                <div className={`sidebar-username-section ${isDarkMode ? "dark-mode" : ""}`}>
                  <span className="sidebar-username-section-username">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="sidebar-username-section-email">
                    {user?.email}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
            <SnackbarContent 
              message="You have been logged out"
              action={ <WarningAmberRoundedIcon style={{ color: "orange" }} /> }
            />
          </Snackbar>
        </div>
      </div>
    </Drawer>
  );
};

export default Sidebar;
