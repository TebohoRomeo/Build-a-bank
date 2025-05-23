// digital-bank-backend/index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());  // to parse JSON in request bodies
app.use(cors());  // to allow cross-origin requests (for frontend)

app.get('/', (req, res) => {
  res.send('Welcome to the Digital Bank API!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
