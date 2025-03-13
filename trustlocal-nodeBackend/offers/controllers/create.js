const { Offer } = require('../models/Offers');
const axios = require('axios');

exports.create = async (req, res) => {
  try {
    let {
      title,
      description,
      date,
      time,
      vatInvoice,
      createdBy,
      price,
      status,
      location,
      phoneNumber
    } = req.body;

    if (!date) {
      date = new Date();
    }

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required for location verification' });
    }

    if (!location || !location.city || !location.street || !location.postalCode || !location.province) {
      return res.status(400).json({ message: 'Location is required with city, street, postalCode, and province' });
    }

    if (!time) {
      const now = new Date();
      time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    let lat, lon;
    let verified = false;

    // 1. Attempt to retrieve location using /api/retrieve-location
    try {
      const retrieveResponse = await axios.post('http://localhost:3000/api/retrieve-location', {
        phoneNumber,
        maxAge: 60  // Adjust maxAge as needed
      });
      
      if (
        retrieveResponse.data &&
        retrieveResponse.data.area &&
        retrieveResponse.data.area.areaType === 'CIRCLE' &&
        retrieveResponse.data.area.center &&
        retrieveResponse.data.area.center.latitude &&
        retrieveResponse.data.area.center.longitude
      ) {
        lat = retrieveResponse.data.area.center.latitude;
        lon = retrieveResponse.data.area.center.longitude;
        console.log('Retrieved location from API:', lat, lon);
      }
    } catch (error) {
      console.error('Error retrieving location for phone number:', error.message);
    }

    // 2. If retrieval failed or did not return valid coordinates, fallback to geocoding via Nominatim
    if (!lat || !lon) {
      const { city, street, postalCode } = location;
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&street=${encodeURIComponent(street)}&postalcode=${encodeURIComponent(postalCode)}&format=json`;
      const nominatimResponse = await axios.get(nominatimUrl);
      const data = nominatimResponse.data;
      if (!data || data.length === 0) {
        return res.status(400).json({ message: 'Unable to geocode location using provided address' });
      }
      lat = data[0].lat;
      lon = data[0].lon;
      console.log('Geocoded location from Nominatim:', lat, lon);
    }

    // 3. Verify location using /api/verify-location with the obtained coordinates
    try {
      const verifyResponse = await axios.post('http://localhost:3000/api/verify-location', {
        phoneNumber,
        latitude: lat,
        longitude: lon,
        radius: 2000,  // Adjust radius if needed
        maxAge: 3600   // Adjust maxAge if needed
      });
      verified = verifyResponse.data.verification || false;
      console.log('Verification result:', verified);
    } catch (verifyError) {
      console.error('Verification error:', verifyError.message);
    }

    // 4. Create the offer with the gathered data and verification flag
    const offer = new Offer({
      title,
      description,
      location,
      date,     
      time,      
      vatInvoice,
      createdBy,
      price,
      status,
      verified,
      coordinates: {
        latitude: lat,
        longitude: lon
      }
    });

    await offer.save();
    res.status(201).json({ message: 'Offer created successfully', offer });
  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ message: 'Error creating offer', details: error.message });
  }
};