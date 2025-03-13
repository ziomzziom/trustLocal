import React, { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../DarkModeContext";
import OfferItemLargeScreen from "../OfferItem/OfferItemLargeScreen";
import OfferItemSmallScreen from "../OfferItem/OfferItemSmallScreen";
import notfound from "../../Static/undraw_empty_re_opql.svg";
import outofoffers from "../../Static/undraw_note_list_re_r4u9.svg";
import "./OffersTab.scss";

const OffersTab = ({ offers, noResults }) => {
  const [activeTab, setActiveTab] = useState("all");
  const { isDarkMode } = useDarkMode();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 960px)" });

  const filteredOffers = Array.isArray(offers)
    ? offers.filter((offer) => {
        if (activeTab === "available") {
          return offer.status === 1;
        }
        return true;
      })
    : [];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;
      console.log("Scrolled to bottom:", scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="OffersTab">
      <div className={`offer-list-tab ${isDarkMode ? "dark-mode" : ""}`}>
        <button
          className={`offer-list-tab-button ${activeTab === "available" ? "active" : ""} ${isDarkMode ? "dark-mode" : ""}`}
          onClick={() => handleTabClick("available")}
        >
          Available Offers
        </button>
        <button
          className={`offer-list-tab-button ${activeTab === "all" ? "active" : ""} ${isDarkMode ? "dark-mode" : ""}`}
          onClick={() => handleTabClick("all")}
        >
          All Offers
        </button>
      </div>
      <div className="offer-list-wrapper">
        <div className={`offer-list ${isDarkMode ? "dark-mode" : ""}`}>
          <div className="invisible-text">Search results:</div>
          {noResults ? (
            <div className={`offer-list-noresult ${isDarkMode ? "dark-mode" : ""}`}>
              <div className="offer-list-noresult-center-content">
                <p>Sorry, <br />We did not find any offers for this search criteria.</p>
                <img src={notfound} alt="No results" style={{ height: '250px' }} />
              </div>
            </div>
          ) : (
            filteredOffers.map((offer) =>
              isSmallScreen ? (
                <OfferItemSmallScreen key={offer.id} offer={offer} />
              ) : (
                <OfferItemLargeScreen key={offer.id} offer={offer} />
              )
            )
          )}
          {!noResults && (
            <div className={`offer-list-end ${isDarkMode ? "dark-mode" : ""}`}>
              <span className={`offer-list-end-text ${isDarkMode ? "dark-mode" : ""}`}>
                Oops! <br />
                It seems we've run out of offers.<br />
                Check back later for more opportunities!
              </span>
              <img src={outofoffers} alt="Out of offers" style={{ height: '150px' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersTab;