import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { errorHandler } from "./infrastructure/http/errorHandler";
import routes from "./infrastructure/http/routes/index";
import { connectDB } from "./infrastructure/db/connect";



const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const start = async () => {
    await connectDB();
    app.listen(4000, () => {
        console.log("🚀 Server running on port 4000");
    })
};

start();