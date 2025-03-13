const express = require('express');
const cors = require('cors'); 
require('dotenv').config();
const { getAccessToken } = require('./auth/getAccessToken');
const { verifyLocation } = require('./auth/locationVerification');
const { callLocationApi } = require('./auth/locationRetrieval');


if (!process.env.ORANGE_CLIENT_ID || !process.env.ORANGE_CLIENT_SECRET) {
    console.error('Missing Orange API credentials in .env file');
    process.exit(1);
}

const app = express();

app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

const authRouter = require('./auth/auth');
const offersRouter = require('./offers/offers');

app.use('/api/auth', authRouter);
app.use('/api/offers', offersRouter);

app.post('/api/verify-location', async (req, res) => {
    const { phoneNumber, latitude, longitude, radius, maxAge } = req.body;

    if (!phoneNumber || !latitude || !longitude || !radius || !maxAge) {
        return res.status(400).json({ 
            error: 'Missing required parameters',
            required: ['phoneNumber', 'latitude', 'longitude', 'radius', 'maxAge']
        });
    }

    try {
        const token = await getAccessToken(
            process.env.ORANGE_CLIENT_ID, 
            process.env.ORANGE_CLIENT_SECRET
        );

        const result = await verifyLocation(
            token,
            phoneNumber,
            latitude,
            longitude,
            radius,
            maxAge
        );

        // Handle Orange API response codes
        if (result.status >= 400 || !result.data) {
            return res.status(502).json({ 
                error: 'Upstream API error',
                details: result.error || 'No data received from Orange API'
            });
        }

        // Safely access verificationResult
        const verificationResult = result.data.verificationResult || 'FALSE';
        const lastLocationTime = result.data.lastLocationTime || null;
        const accuracyRadius = result.data.accuracyRadius || null;

        res.json({
            verification: verificationResult === 'TRUE',
            lastLocationTime,
            accuracy: accuracyRadius
        });

    } catch (error) {
        console.error('Verification Process Error:', error);
        res.status(500).json({ 
            error: 'Verification process failed',
            details: error.message
        });
    }
});
app.post('/api/retrieve-location', async (req, res) => {
    const { phoneNumber, maxAge } = req.body;

    if (!phoneNumber || !maxAge) {
        return res.status(400).json({ 
            error: 'Missing required parameters',
            required: ['phoneNumber', 'maxAge']
        });
    }

    try {
        const token = await getAccessToken(
            process.env.ORANGE_CLIENT_ID, 
            process.env.ORANGE_CLIENT_SECRET
        );

        const locationResult = await callLocationApi(token, phoneNumber, maxAge);

        if (!locationResult.data) {
            return res.status(502).json({ 
                error: 'Upstream API error',
                details: locationResult.error || 'No data received from Orange API'
            });
        }

        res.json(locationResult.data);
    } catch (error) {
        console.error('Error during location retrieval:', error);
        res.status(500).json({ 
            error: 'Internal Server Error',
            details: error.message
        });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
