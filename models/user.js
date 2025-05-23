// digital-bank-backend/models/user.js
const db = require('./db');

// Get all users
const getAllUsers = async () => {
  try {
    return await db.any('SELECT * FROM users');
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    return await db.oneOrNone('SELECT * FROM users WHERE user_id = $1', [userId]);
  } catch (error) {
    throw new Error('Error fetching user by ID: ' + error.message);
  }
};

// Add a new user
const createUser = async (userData) => {
  const { name, email, password_hash } = userData;
  try {
    return await db.one('INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING *', [name, email, password_hash]);
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

module.exports = { getAllUsers, getUserById, createUser };
