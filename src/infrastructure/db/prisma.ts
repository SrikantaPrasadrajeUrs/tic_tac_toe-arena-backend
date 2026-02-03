import { PrismaClient } from "@prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';          // PG adapter
import { Pool } from 'pg';
// import dotenv from "dotenv"
// dotenv.config();

const connectionString = process.env.DATABASE_URL;
const env = process.env.NODE_ENV;
if (!connectionString) {
  throw new Error('DATABASE_URL not set in .env');
}
const pool = new Pool({ 
  connectionString,
  ssl: env === "production"? { rejectUnauthorized: false }:false
});

// Create the adapter
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({adapter, log: env == "production"? []: ["query"]});
