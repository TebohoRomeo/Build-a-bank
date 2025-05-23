const { createTransaction, getTransactionsByAccountId } = require('../models/transaction');

// Create a new transaction
const createTransaction = async (req, res) => {
  const { accountId, amount, transactionType, description } = req.body;

  try {
    const newTransaction = await createTransaction({ accountId, amount, transactionType, description });
    res.status(201).json({ transaction: newTransaction });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transaction', error });
  }
};

// Get all transactions for an account
const getTransactionsByAccountId = async (req, res) => {
  const { accountId } = req.params;

  try {
    const transactions = await getTransactionsByAccountId(accountId);
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

module.exports = { createTransaction, getTransactionsByAccountId };
