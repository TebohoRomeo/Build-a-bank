// digital-bank-backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserById } = require('../models/user');

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user to DB
    const user = await createUser({ name, email, password_hash: passwordHash });

    // Respond with success
    res.status(201).json({ message: 'User created successfully!', userId: user.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserById(email);
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { register, login };
