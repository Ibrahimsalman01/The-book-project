import dotenv from 'dotenv';
dotenv.config();


const dbUrl = process.env.DB_URL;


export {
  dbUrl
}