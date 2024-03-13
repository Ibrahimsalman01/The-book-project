const { Sequelize } = require('sequelize');
require('dotenv').config();

// Not sure if this is necessary for the future
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

const connectionOptions = {
  host: HOST,
  port: PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true
    }
  }
};

module.exports = {
  USERNAME,
  PASSWORD,
  PORT,
  connectionOptions
};