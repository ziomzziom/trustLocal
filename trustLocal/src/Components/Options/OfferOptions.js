import React from "react";

const OfferOptions = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Offer Options</h2>
      <form onSubmit={handleSubmit}>
      </form>
    </div>
  );
};

export default OfferOptions;
