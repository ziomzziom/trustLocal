import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useDarkMode } from "../Offers/DarkModeContext";
import { useAuth } from "../Offers/AuthContext";
import Sidebar from "./SideBar/Sidebar";
import CreateOrderDialog from "./SideBar/CreateOrderDialog"; 
import "./Header.scss";

const Header = ({ activeTab, isSmallScreen }) => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { isAuthenticated } = useAuth();

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setOpenSidebar(false); 
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={`header-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="header-title content">
        <Link to="/" className={`title-link ${isDarkMode ? "dark-mode" : ""}`} >
          <span className={`title ${isDarkMode ? "dark-mode" : ""}`}>Trust Local</span>
        </Link>
        { !isSmallScreen && (
          <span className={`title-text ${isDarkMode ? "dark-mode" : ""}`}>Where skills come full circle</span>
        )}
        <label className={`switch ${isDarkMode ? "dark-mode" : ""}`}>
          <input type="checkbox" onChange={toggleDarkMode} />
            <span className={`slider round ${isDarkMode ? "dark-mode" : ""}`}>
              <LightModeIcon className="LightModeIcon" fontSize='small' />
              <DarkModeIcon className="DarkModeIcon" fontSize='small' />
            </span>
        </label>
      </div>
      <div className="header-actions">
        {!isAuthenticated && (
          <Link to="/login">
            <button className={`${activeTab === 1 ? "button active" : "button"} ${isDarkMode ? "dark-mode" : ""} sign-in-button`}>
              Sign In
            </button>
          </Link>
        )}
        {isAuthenticated && (
          <IconButton>
            <NotificationsIcon className={`notification-icon ${isDarkMode ? "dark-mode" : ""}`} />
          </IconButton>
        )
        }
        <Link className='options-button-link'>
          <IconButton 
            className={`${activeTab === 2 ? "button active" : "button"} ${isDarkMode ? "dark-mode" : ""}options-button`}
            onClick={handleSidebarOpen} 
          >
            <MenuIcon fontSize='medium' className={`options-button-icon ${isDarkMode ? "dark-mode" : ""}`} />
          </IconButton>
        </Link>
        
        <CreateOrderDialog open={isDialogOpen} onClose={handleCloseDialog} />

        <Sidebar
          isAuthenticated={isAuthenticated}
          open={openSidebar}
          onClose={handleSidebarClose}
          onAddNewOfferClick={handleOpenDialog}
        />

      </div>
    </div>
  );
};

export default Header;
