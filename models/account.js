// digital-bank-backend/models/account.js
const db = require('./db');

// Get account by user ID
const getAccountByUserId = async (userId) => {
  try {
    return await db.any('SELECT * FROM accounts WHERE user_id = $1', [userId]);
  } catch (error) {
    throw new Error('Error fetching accounts: ' + error.message);
  }
};

// Get account by account ID
const getAccountById = async (accountId) => {
  try {
    return await db.oneOrNone('SELECT * FROM accounts WHERE account_id = $1', [accountId]);
  } catch (error) {
    throw new Error('Error fetching account by ID: ' + error.message);
  }
};

// Create a new account
const createAccount = async (accountData) => {
  const { userId, accountType, initialBalance } = accountData;
  try {
    return await db.one('INSERT INTO accounts(user_id, account_type, balance) VALUES($1, $2, $3) RETURNING *', [userId, accountType, initialBalance]);
  } catch (error) {
    throw new Error('Error creating account: ' + error.message);
  }
};

module.exports = { getAccountByUserId, getAccountById, createAccount };
