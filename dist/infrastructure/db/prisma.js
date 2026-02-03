"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg"); // PG adapter
const pg_1 = require("pg");
// import dotenv from "dotenv"
// dotenv.config();
const connectionString = process.env.DATABASE_URL;
const env = process.env.NODE_ENV;
if (!connectionString) {
    throw new Error('DATABASE_URL not set in .env');
}
const pool = new pg_1.Pool({
    connectionString,
    ssl: env === "production" ? { rejectUnauthorized: false } : false
});
// Create the adapter
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new client_1.PrismaClient({ adapter, log: env == "production" ? [] : ["query"] });
