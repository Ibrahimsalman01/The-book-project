const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();
const config = require('./utils/config');

const sequelize = new Sequelize('Books', config.USERNAME, config.PASSWORD, config.connectionOptions);

sequelize
  .authenticate()
  .then(() => {
    console.log('Sucessfully connected to the Azure PostgreSQL Flexible Server');
  })
  .catch(error => {
    console.error('Unable to properly connect to the database', error);
  });

module.exports = app;