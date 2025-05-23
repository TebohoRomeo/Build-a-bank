// digital-bank-backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const { createAccount } = require('../controllers/accountController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

// Protected route to create an account
router.post('/', authenticateJWT, createAccount);

module.exports = router;
