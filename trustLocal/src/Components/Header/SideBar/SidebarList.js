import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import {
  WorkOutline,
  Facebook,
  People,
  EmojiPeople,
  Equalizer,
  RssFeed,
  Create as CreateIcon,
  Close as CloseIcon,
  QuizOutlined as QuizOutlinedIcon,
} from "@mui/icons-material";

const employerPanelIcon = <WorkOutline />;
const facebookIcon = <Facebook />;
const aboutUsIcon = <People />;
const recruitmentIcon = <EmojiPeople />;
const itIndexIcon = <Equalizer />;
const rssFeedIcon = <RssFeed />;
const createIcon = <CreateIcon />;
const quizIcon = <QuizOutlinedIcon />;
const closeIcon = <CloseIcon />;

const sidebarItems = [
  { title: "Offers", icon: employerPanelIcon, link: "/" },
  { title: "Add New Offer", icon: createIcon, action: "openDialog" }, 
  { title: "Facebook", icon: facebookIcon, link: "/facebook" },
  { title: "About us", icon: aboutUsIcon, link: "/about-us" },
  { title: "Recruitment", icon: recruitmentIcon, link: "/recruitment" },
  { title: "IT Index", icon: itIndexIcon, link: "/it-index" },
  { title: "RSS", icon: rssFeedIcon, link: "/rss" },
  { title: "FAQ", icon: quizIcon, link: "/quiz" },
  { title: "Close", icon: closeIcon },
];

const SidebarList = ({ onClose, isDarkMode, onAddNewOfferClick }) => {
  const filteredSidebarItems = sidebarItems.filter((item) => item.title !== "Logout");

  const handleItemClick = (item) => {
    if (item.action === "openDialog") {
      onAddNewOfferClick(); 
      onClose();
    } else {
      onClose(); 
    }
  };

  return (
    <List>
      <div className={`sidebar-list ${isDarkMode ? "dark-mode" : ""}`}>
        {filteredSidebarItems.map((item, index) => (
          <ListItem
            button
            component={item.action !== "openDialog" ? "a" : "div"} 
            href={item.link}
            onClick={() => handleItemClick(item)}
            key={index}
          >
            <ListItemIcon className={`sidebar-list-item-icon ${isDarkMode ? "dark-mode" : ""}`}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </div>
    </List>
  );
};

export default SidebarList;
