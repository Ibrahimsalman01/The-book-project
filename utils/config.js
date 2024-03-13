require('dotenv').config();

// Not sure if this is necessary for the future
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST;
const PORT = process.env.DB_PORT;

const connectionConfig = {
  host: HOST,
  user: USERNAME,     
  password: PASSWORD,
  database: 'Books',
  port: PORT,
  ssl: true
};

module.exports = {
  USERNAME,
  PASSWORD,
  HOST,
  PORT,
  connectionConfig
};