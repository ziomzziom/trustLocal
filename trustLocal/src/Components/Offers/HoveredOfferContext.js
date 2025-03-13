import React, { createContext, useContext, useState } from "react";

const HoveredOfferContext = createContext();
const useHoveredOffer = () => useContext(HoveredOfferContext);

const HoveredOfferProvider = ({ children }) => {
  const [hoveredOfferId, setHoveredOfferId] = useState(null);

  return (
    <HoveredOfferContext.Provider value={{ hoveredOfferId, setHoveredOfferId }}>
      {children}
    </HoveredOfferContext.Provider>
  );
};

export { HoveredOfferProvider, useHoveredOffer };