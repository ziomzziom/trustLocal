const axios = require('axios');

async function callLocationApi(accessToken, phoneNumber, maxAge) {
    const apiUrl = 'https://api.orange.com/camara/orange-lab/location-retrieval/v0.3/retrieve';
    
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-correlator': 'trustlocal-retrieval-1'
    };

    const payload = {
        device: {
            phoneNumber: phoneNumber
        },
        maxAge: parseInt(maxAge, 10)
    };

    try {
        const response = await axios.post(apiUrl, payload, { 
            headers,
            validateStatus: (status) => status < 500
        });

        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Retrieval API Error:', {
            status: error.response?.status,
            data: error.response?.data
        });
        
        return {
            status: error.response?.status || 500,
            error: error.response?.data || { message: 'Retrieval service unavailable' }
        };
    }
}

module.exports = { callLocationApi };