const axios = require('axios');

async function verifyLocation(accessToken, phoneNumber, latitude, longitude, radius, maxAge) {
    const apiUrl = 'https://api.orange.com/camara/orange-lab/location-verification/v1/verify';
    
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-correlator': 'trustlocal-verification-1'
    };

    const payload = {
        device: {
            phoneNumber: phoneNumber
        },
        area: {
            areaType: "CIRCLE",
            center: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            radius: parseFloat(radius)
        },
        maxAge: parseInt(maxAge, 10)
    };

    try {
        const response = await axios.post(apiUrl, payload, { 
            headers,
            timeout: 10000, // 10-second timeout
            validateStatus: (status) => status < 500 // Don't throw for 4xx errors
        });

        if (!response.data || !response.data.verificationResult) {
            throw new Error('Invalid response from Orange API');
        }

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Verification API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        
        return {
            status: error.response?.status || 500,
            error: error.response?.data || { message: 'Verification service unavailable' }
        };
    }
}

module.exports = { verifyLocation };