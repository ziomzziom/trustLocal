const axios = require('axios');
const Buffer = require('buffer').Buffer;

async function getAccessToken(clientId, clientSecret) {
    const tokenUrl = 'https://api.orange.com/oauth/v3/token';
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    try {
        const response = await axios.post(tokenUrl, 'grant_type=client_credentials', {
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 5000 
        });

        if (!response.data.access_token) {
            throw new Error('No access token received');
        }

        return response.data.access_token;
    } catch (error) {
        console.error('Token Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        throw new Error('Failed to obtain access token');
    }
}

module.exports = { getAccessToken };