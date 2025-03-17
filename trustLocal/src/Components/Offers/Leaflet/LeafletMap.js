import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "./LeafletMap.scss";
import marker from "../../Static/marker.png";
import { useDarkMode } from "../DarkModeContext";

const LeafletMap = ({ offers = [] }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const zoomControlRef = useRef(null);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Remove previous map instance if exists
    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
      markersRef.current = {};
    }

    try {
      // Initialize the map with a default view
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
        }).addTo(map);
      };

      addOrUpdateTileLayer();

      // Add zoom controls to the map
      zoomControlRef.current = L.control.zoom({ position: "topright" }).addTo(map);

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
          const { coordinates, title } = offer;
          // Use 'id' or '_id' as identifier
          const offerId = offer.id || offer._id;
          if (coordinates) {
            const { latitude, longitude } = coordinates;
            const markerInstance = L.marker([latitude, longitude], {
              icon: defaultMarkerIcon,
            });
            markerInstance.bindPopup(title);
            markers.addLayer(markerInstance);
            markersRef.current[offerId] = markerInstance;
          }
        });

        map.addLayer(markers);

        // If only a single offer is passed, zoom into its coordinates
        if (offers.length === 1) {
          const { coordinates } = offers[0];
          if (coordinates) {
            const { latitude, longitude } = coordinates;
            map.setView([latitude, longitude], 15); // Adjust zoom level as needed
          }
        }
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
