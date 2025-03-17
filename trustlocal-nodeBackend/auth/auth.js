const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const login = require('./controllers/login');
const register = require('./controllers/register');
const User = require('./models/User');
const { getCurrentUser } = require('./controllers/user'); // Import the new function
const authenticate = require('./middleware/auth');

process.env.SECRET_KEY = 'my_secret_key_1234567890';

mongoose.connect('mongodb://127.0.0.1:27017/bettercallsaul', { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

router.use(bodyParser.json());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password); // Call the login controller
    res.json({ token });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const result = await register(firstName, lastName, email, password); // Call the register controller
    res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/user', authenticate, getCurrentUser); 

module.exports = router;
