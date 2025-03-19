const axios = require('axios');

async function callLocationApi(accessToken, phoneNumber, maxAge) {
    const apiUrl = 'https://api.orange.com/camara/orange-lab/location-retrieval/v0.3/retrieve';

    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'x-correlator': 'trustlocal-retrieval-1'
    };

    let adjustedMaxAge = parseInt(maxAge, 10);
    if (adjustedMaxAge < 60) {
        console.warn(`MaxAge too low (${adjustedMaxAge}), increasing to 300`);
        adjustedMaxAge = 300;
    }

    const payload = {
        device: { phoneNumber },
        maxAge: adjustedMaxAge
    };

    try {
        let response = await axios.post(apiUrl, payload, { headers, validateStatus: (status) => status < 500 });

        if (response.status === 422 && response.data.code === 'LOCATION_RETRIEVAL.UNABLE_TO_FULFILL_MAX_AGE') {
            console.warn("Retrying with maxAge = 600...");
            payload.maxAge = 600; // Increase maxAge and retry once
            response = await axios.post(apiUrl, payload, { headers, validateStatus: (status) => status < 500 });
        }

        return { status: response.status, data: response.data };
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
