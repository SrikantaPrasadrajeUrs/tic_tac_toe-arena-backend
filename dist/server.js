"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./infrastructure/http/errorHandler");
const index_1 = __importDefault(require("./infrastructure/http/routes/index"));
const connect_1 = require("./infrastructure/db/connect");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use("/api", index_1.default);
app.use(errorHandler_1.errorHandler);
const start = async () => {
    await (0, connect_1.connectDB)();
    app.listen(4000, () => {
        console.log("🚀 Server running on port 4000");
    });
};
start();
