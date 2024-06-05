import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../schema/schema.js";
import { dbUrl } from '../utils/database.config.js';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
    connectionString: dbUrl,
      ssl: true
  });



export const DatabaseService = {
  drizzleInit: () => drizzle(pool, { schema }),
  closePool: () => {pool.end();}
};
