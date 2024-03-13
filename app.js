const pg = require('pg');
const config = require('./utils/config');

const client = new pg.Client(config.connectionConfig);

console.log('Attempting to connect the Books DB');

// Will figure out a cleaner way to connect
client
  .connect(err => {
    if (err) throw err;
    else {
      console.log('Successfully connected to the Books DB');
    }
  });

/**
 * Notes:
 * - Don't need to include client.end()
 *   because the app will run continuously
 * 
 * - Can start soon on implementing express
 *   and testing with postman
 * 
 * Things to add:
 * - Middlware
 */