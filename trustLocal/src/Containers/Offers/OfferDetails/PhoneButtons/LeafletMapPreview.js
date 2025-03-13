import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDarkMode } from "../../../../Components/Offers/DarkModeContext";

const LeafletMapPreview = ({ onClick }) => {
  const { isDarkMode } = useDarkMode();

  const apiKey = "XgilIkWrWkSQFf0jdONa";
  const format = "png";

  let mapId = "streets-v2";
  if (isDarkMode) {
    mapId = "streets-v2-dark";
  }

  const tileLayerUrl = `https://api.maptiler.com/maps/${mapId}/{z}/{x}/{y}.${format}?key=${apiKey}`;

  return (
    <div className="leaflet-map-preview" onClick={onClick}>
      <MapContainer
        center={[52.237049, 21.017532]}
        zoom={15}
        style={{ width: "100%", height: "150px" }}
        dragging={false}
        zoomControl={false}
      >
        <TileLayer url={tileLayerUrl} />
      </MapContainer>
    </div>
  );
};

export default LeafletMapPreview;
