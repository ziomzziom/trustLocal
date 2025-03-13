const User = require('../models/User');

async function register(firstName, lastName, email, password, phoneNumber) {
  if (!firstName || !lastName || !email || !password) {
    throw new Error('Please fill in all fields');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const user = new User({ firstName, lastName, email, password, phoneNumber });

  try {
    await user.save();
    return { message: 'Registration successful!' };
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = register;
