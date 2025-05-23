// digital-bank-backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Authorization Middleware: Check if the logged-in user is the owner of the account
const authorizeAccountOwner = (req, res, next) => {
  const { accountId } = req.params;

  // Retrieve account data
  db.oneOrNone('SELECT * FROM accounts WHERE account_id = $1', [accountId])
    .then(account => {
      if (account && account.user_id === req.user.userId) {
        return next();  // Proceed if the user is the owner of the account
      } else {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to access this account' });
      }
    })
    .catch(error => res.status(500).json({ message: 'Error verifying account ownership', error }));
};

module.exports = { authenticateJWT, authorizeAccountOwner };
