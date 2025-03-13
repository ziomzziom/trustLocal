import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "./LeafletMap.scss";
import marker from "../../Static/marker.png";
import { useDarkMode } from "../DarkModeContext";

const LeafletMap = ({ offers }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const zoomControlRef = useRef(null);

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
      markersRef.current = {};
    }

    try {
      const map = L.map("map", {
        zoomControl: false,
      }).setView([52.100264, 19.12], 6);
      mapRef.current = map;

      const addOrUpdateTileLayer = () => {
        const apiKey = "XgilIkWrWkSQFf0jdONa";
        const format = "png";

        let mapId = "streets-v2";
        if (isDarkMode) {
          mapId = "streets-v2-dark";
        }

        const tileLayerUrl = `https://api.maptiler.com/maps/${mapId}/{z}/{x}/{y}.${format}?key=${apiKey}`;

        L.tileLayer(tileLayerUrl, {
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
        }).addTo(mapRef.current);
      };

      addOrUpdateTileLayer();

      zoomControlRef.current = L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current);

      if (Array.isArray(offers) && offers.length > 0) {
        const defaultMarkerIcon = L.icon({
          iconUrl: marker,
          iconSize: [60, 60],
          iconAnchor: [30, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
        });

        const clusterOptions = {
          disableClusteringAtZoom: 15,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
        };

        const markers = L.markerClusterGroup(clusterOptions);

        offers.forEach((offer) => {
          const { id, coordinates } = offer;
          if (coordinates) {
            const { latitude, longitude } = coordinates;
            const marker = L.marker([latitude, longitude], {
              icon: defaultMarkerIcon,
            });
            marker.bindPopup(offer.title);

            markers.addLayer(marker);

            markersRef.current[id] = marker;
          }
        });

        mapRef.current.addLayer(markers);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [offers, isDarkMode]);

  return (
    <div id="map" className={`leaflet-map ${isDarkMode ? "dark-mode" : ""}`}>
      <div
        id="map-container"
        className={`leaflet-map-container ${isDarkMode ? "dark-mode" : ""}`}
      ></div>
    </div>
  );
};

export default LeafletMap;