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

    // Set default date and time
    if (!date) date = new Date();
    if (!time) {
      const now = new Date();
      time = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    }

    let lat, lon;
    let verified = false;
    let usingPhoneLocation = false;

    // 1. Try phone-based location retrieval first if phone number is provided
    if (phoneNumber) {
      try {
        console.log('Attempting phone-based location retrieval for:', phoneNumber);
        const retrieveResponse = await axios.post('http://localhost:3000/api/retrieve-location', {
          phoneNumber,
          maxAge: 60
        });
    
        console.log('Phone location API response:', retrieveResponse.data); // Debugging line
    
        if (retrieveResponse.data?.area?.center) {
          lat = retrieveResponse.data.area.center.latitude;
          lon = retrieveResponse.data.area.center.longitude;
          usingPhoneLocation = true;
          console.log('Using phone-based location:', lat, lon);
        } else {
          console.warn('Phone location API did not return valid coordinates.');
        }
      } catch (error) {
        console.error('Phone location retrieval error:', error.message);
      }
    }

    // 2. Fallback to address geocoding only if phone-based retrieval failed
    if (!lat || !lon) {
      if (!location?.city || !location?.street || !location?.postalCode || !location?.province) {
        return res.status(400).json({
          message: 'Either valid phone number or complete address required',
          required: phoneNumber ? [] : ['city', 'street', 'postalCode', 'province']
        });
      }

      try {
        const { city, street, postalCode } = location;
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&street=${encodeURIComponent(street)}&postalcode=${encodeURIComponent(postalCode)}&format=json`;
        const nominatimResponse = await axios.get(nominatimUrl);
        const [firstResult] = nominatimResponse.data;
        
        if (!firstResult) throw new Error('No geocoding results found');
        
        lat = firstResult.lat;
        lon = firstResult.lon;
        console.log('Using geocoded address location:', lat, lon);
      } catch (error) {
        console.error('Geocoding error:', error.message);
        return res.status(400).json({ 
          message: 'Address geocoding failed',
          details: error.message
        });
      }
    }

    // 3. Verify location (only if phone number was used)
    if (usingPhoneLocation) {
      try {
        const verifyResponse = await axios.post('http://localhost:3000/api/verify-location', {
          phoneNumber,
          latitude: lat,
          longitude: lon,
          radius: 2000,
          maxAge: 3600
        });
        verified = verifyResponse.data.verification || false;
      } catch (verifyError) {
        console.error('Verification error:', verifyError.message);
      }
    }

    // 4. Ensure location object exists if using phone-based location
    if (usingPhoneLocation) {
      location = this._simplifyLocation(location);
    }

    // 5. Create the offer
    const offer = new Offer({
      title,
      description,
      location,
      coordinates: { latitude: lat, longitude: lon },
      date,
      time,
      vatInvoice,
      createdBy: {
        ...createdBy,
        phoneNumber // Include phoneNumber in createdBy
      },
      price,
      status,
      verified,
      locationSource: usingPhoneLocation ? 'phone' : 'address'
    });

    await offer.save();
    res.status(201).json({ 
      message: 'Offer created successfully',
      offer: this._sanitizeOffer(offer)
    });

  } catch (error) {
    console.error('Error creating offer:', error);
    res.status(500).json({ 
      message: 'Error creating offer',
      details: error.message
    });
  }
};

exports._simplifyLocation = (location) => ({
  city: location?.city || 'Unknown',
  street: location?.street || 'Unknown',
  postalCode: location?.postalCode || '00000',
  province: location?.province || 'Unknown'
});

exports._sanitizeOffer = (offer) => ({
  ...offer._doc,
  coordinates: undefined, 
  verified: undefined
});
