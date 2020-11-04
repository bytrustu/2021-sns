const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DB_PASSWORD: process.env.DB_PASSWORD,
}