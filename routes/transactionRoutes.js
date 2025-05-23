// digital-bank-backend/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { createTransaction, getTransactionsByAccountId } = require('../controllers/transactionController');
const { authenticateJWT, authorizeAccountOwner } = require('../middlewares/authMiddleware');

// Create a transaction (POST)
router.post('/', authenticateJWT, createTransaction);

// Get transactions by account ID (GET)
router.get('/:accountId', authenticateJWT, authorizeAccountOwner, getTransactionsByAccountId);

module.exports = router;
