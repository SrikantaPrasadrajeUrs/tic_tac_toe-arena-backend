"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const prisma_1 = require("./prisma");
const connectDB = async () => {
    try {
        await prisma_1.prisma.$connect();
        console.log("✅ Database connected");
    }
    catch (error) {
        console.error("❌ Database connection failed", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
