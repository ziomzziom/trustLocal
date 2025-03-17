import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../../Components/Offers/DarkModeContext";
import LoadingBox from "../../../Components/Utils/Loading/LoadingBox";
import LeafletMap from "../../../Components/Offers/Leaflet/LeafletMap";
import Header from "../../../Components/Header/Header";
import OffersHeader from "../../../Components/Offers/OffersHeader/OffersHeader";

import "./OfferDetailsPage.scss";
import { useMediaQuery, useTheme } from "@mui/material";
import OfferDetails from "./OfferDetails";
import DetailsCancelButton from "./PhoneButtons/DetailsCancelButton";

const OfferDetailsPage = () => {
  const [offer, setOffer] = useState(null);
  const { id } = useParams();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMap, setShowMap] = useState(false);

  const [status, setStatus] = useState("loading");

  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    fetch(`http://192.168.1.114:3000/api/offers/getone?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setOffer(data);
        setStatus("success");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, [id]);

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleMapCancelButtonClick = () => {
    setShowMap(false);
  };

  return (
    <>
      <Header activeTab={0} isSmallScreen={isSmallScreen} />
      {!isSmallScreen && <OffersHeader offers={[]} isDetailsPage={true} />}
      <div className={`details-container ${isDarkMode ? "dark-mode" : ""}`}>
        {status === "loading" ? (
          <div className="loading-container">
            <LoadingBox height="100" />
          </div>
        ) : status === "success" ? (
          <div className="left-container">
            {isSmallScreen && showMap ? (
              <Suspense fallback={<div>Loading map...</div>}>
                <LeafletMap showMap={showMap} offers={offer ? [offer] : []} />
              </Suspense>
            ) : (
              <OfferDetails
                offer={offer}
                isDarkMode={isDarkMode}
                onMapButtonClick={handleMapButtonClick}
                showMap={showMap}
              />
            )}
          </div>
        ) : null}
        {!isSmallScreen && (
          <div className="right-container">
            <Suspense fallback={<div>Loading map...</div>}>
              <LeafletMap offers={offer ? [offer] : []} />
            </Suspense>
          </div>
        )}
        {isSmallScreen && showMap && (
          <div className="map-cancel-wrapper">
            <DetailsCancelButton
              isDarkMode={isDarkMode}
              className="map-cancel-icon"
              showMap={showMap}
              onCancel={handleMapCancelButtonClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OfferDetailsPage;
