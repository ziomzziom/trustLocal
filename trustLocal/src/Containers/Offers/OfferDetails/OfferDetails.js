import React from "react";
import { Avatar } from "@mui/material";
import DetailsCancelButton from "./PhoneButtons/DetailsCancelButton";
import { LocationOn, Schedule, Phone, Email } from "@mui/icons-material";
import { useMediaQuery, useTheme } from "@mui/material";
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import LeafletMapPreview from "./PhoneButtons/LeafletMapPreview";
import "./OfferDetails.scss";
import { IconButton } from "@mui/material";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";

const OfferDetails = ({ offer, isDarkMode, onMapButtonClick, showMap }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMapButtonClick = () => {
    onMapButtonClick();
  };

  return (
    <div className="offer-details-wrapper">
      <div className="paper-container p-3">
        <div className="grid-container">
          <div className={`details-header-container ${isDarkMode ? "dark-mode" : ""}`}>
            <DetailsCancelButton />
            <div className="avatar-wrapper">
              <Avatar
                style={{
                  width: isSmallScreen ? "120px" : "147px",
                  height: isSmallScreen ? "120px" : "147px",
                  backgroundColor: isDarkMode ? 'var(--color-tag-background-light)' : 'var(--color-tag-background-dark)',
                }}
                className={`offer-item-avatar ${isDarkMode ? "dark-mode" : ""}`}
                size="large"
                alt="Avatar"
              >
                {offer.createdBy?.photo && (
                  <img
                    src={offer.createdBy.photo}
                    alt={`${offer.createdBy.firstName || ''} ${offer.createdBy.lastName || ''}`}
                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                  />
                )}
              </Avatar>
            </div>
            <div className="details-header-details">
              <div className="offer-details-title">
                {offer.title} 
              </div>
              <div className="text-secondary mt-1">
                <LocationOn fontSize="small" className="mr-1" />
                {offer.location?.city}, {offer.location?.province}
              </div>
              {offer.vatInvoice && (
                <div className="details-invoice-icon" title="Faktura VAT">
                  <RequestQuoteOutlinedIcon />
                  Faktura VAT
                </div>
              )}
              {offer.verified && 
                <div><VerifiedTwoToneIcon className="verified-icon" /> Verified by Orange</div>
              }
            </div>
          </div>

          <div className={`details-description ${isDarkMode ? "dark-mode" : ""}`}>
            Opis <hr />
            {offer.description}
          </div>

          {isSmallScreen && (<LeafletMapPreview onClick={handleMapButtonClick} />)}

          <div className={`details-contact-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
            {offer.date && offer.time ? (
              <div className={`details-contact-item ${isDarkMode ? "dark-mode" : ""}`}>
                <Schedule fontSize="small" className="details-contact-icon" />
                {new Date(offer.date).toLocaleDateString("pl-EU", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                {offer.time}
              </div>
            ) : null}
            {offer.phone && (
              <div className={`details-contact-item ${isDarkMode ? "dark-mode" : ""}`}>
                <>
                  <Phone fontSize="small" className="details-contact-icon" />
                  {offer.phone}
                </>
              </div>
            )}
            {offer.email && (
              <div className={`details-contact-item ${isDarkMode ? "dark-mode" : ""}`}>
                <>
                  <Email fontSize="small" className="details-contact-icon" />
                  {offer.email}
                </>
              </div>
            )}
          </div>
          <div className="details-media-wrapper">
            <div className="details-media">
              <div className="media-links">
                <IconButton>
                  <Facebook fontSize="large" className={`details-media-item ${isDarkMode ? "dark-mode" : ""}`} />
                </IconButton>
                <IconButton>
                  <LinkedIn fontSize="large" className={`details-media-item ${isDarkMode ? "dark-mode" : ""}`} />
                </IconButton>
                < IconButton>
                  <Twitter fontSize="large" className={`details-media-item ${isDarkMode ? "dark-mode" : ""}`} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;