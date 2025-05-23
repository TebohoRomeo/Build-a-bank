const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'digital_bank',
  user: 'postgres',
  password: 'yourpassword',
});

module.exports = db;
