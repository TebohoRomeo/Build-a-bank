// digital-bank-backend/models/transaction.js
const db = require('./db');

// Create a new transaction
const createTransaction = async (transactionData) => {
  const { accountId, amount, transactionType, description } = transactionData;
  try {
    return await db.one('INSERT INTO transactions(account_id, amount, transaction_type, description) VALUES($1, $2, $3, $4) RETURNING *', [accountId, amount, transactionType, description]);
  } catch (error) {
    throw new Error('Error creating transaction: ' + error.message);
  }
};

// Get transactions for a specific account
const getTransactionsByAccountId = async (accountId) => {
  try {
    return await db.any('SELECT * FROM transactions WHERE account_id = $1', [accountId]);
  } catch (error) {
    throw new Error('Error fetching transactions: ' + error.message);
  }
};

module.exports = { createTransaction, getTransactionsByAccountId };
