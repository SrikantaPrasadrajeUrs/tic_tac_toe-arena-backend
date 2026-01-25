import { PrismaClient } from "../../generated/prisma";
import { PrismaPg } from '@prisma/adapter-pg';          // PG adapter
import { Pool } from 'pg';
// import dotenv from "dotenv"
// dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL not set in .env');
}
const pool = new Pool({ connectionString });

// Create the adapter
const adapter = new PrismaPg({connectionString});
const env = process.env.NODE_ENV;
export const prisma = new PrismaClient({adapter, log: env == "production"? []: ["query"]});
