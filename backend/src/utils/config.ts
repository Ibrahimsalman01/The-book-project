import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../schema/schema.js";
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();


const dbUrl = process.env.DB_URL;

const pool = new Pool({
  connectionString: dbUrl,
    ssl: true
});


export const DatabaseService = {
  drizzleInit: () => drizzle(pool, { schema }),
  closePool: () => pool.end()
};

export const PORT = process.env.APP_PORT || 3000;

