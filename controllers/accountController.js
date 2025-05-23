// digital-bank-backend/controllers/accountController.js
const { createAccount, getAccountByUserId } = require('../models/account');

// Create account
const createAccount = async (req, res) => {
  const { accountType, initialBalance } = req.body;
  const userId = req.user.userId; // Get the user ID from the JWT

  try {
    const newAccount = await createAccount({ userId, accountType, initialBalance });
    res.status(201).json({ account: newAccount });
  } catch (error) {
    res.status(500).json({ message: 'Error creating account', error });
  }
};

module.exports = { createAccount };
