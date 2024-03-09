const pg = require('pg');
require('dotenv').config();

console.log(process.env.BOOK_DB_HOST);

const config = {
  host: process.env.BOOK_DB_HOST,
  // Do not hard code your username and password.
  // Consider using Node environment variables.
  user: process.env.BOOK_DB_USERNAME,     
  password: process.env.BOOK_DB_PASSWORD,
  database: 'Books',
  port: 5432,
  ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    else {
        // queryDatabase();
        selectFromInv();
    }
});

function queryDatabase() {
    const query = `
        DROP TABLE IF EXISTS inventory;
        CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);
        INSERT INTO inventory (name, quantity) VALUES ('banana', 150);
        INSERT INTO inventory (name, quantity) VALUES ('orange', 154);
        INSERT INTO inventory (name, quantity) VALUES ('apple', 100);
    `;

    client
        .query(query)
        .then(() => {
            console.log('Table created successfully!');
            client.end(console.log('Closed client connection'));
        })
        .catch(err => console.log(err))
        .then(() => {
            console.log('Finished execution, exiting now');
            process.exit();
        });
}

function selectFromInv() {
  const query = `
    SELECT *
    FROM Books;
  `;

  client
    .query(query)
    .then(result => {
      console.log(result.rows);
      client.end();
    })
    .catch(err => console.log(err))
}