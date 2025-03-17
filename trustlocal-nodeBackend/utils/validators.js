const validatePhoneNumber = (phoneNumber) => {
    return /^\+[1-9]\d{1,14}$/.test(phoneNumber); // E.164 format 
  };
  
  const validateMaxAge = (maxAge) => {
    return Number.isInteger(maxAge) && maxAge >= 1 && maxAge <= 2160;
  };
  
  module.exports = { validatePhoneNumber, validateMaxAge };