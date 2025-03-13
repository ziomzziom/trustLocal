const express = require('express');
const app = express(); 

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for handling CORS
const cors = require('cors');
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
