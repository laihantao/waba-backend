import express from "express";
import cors from "cors";    
import whatsappRoutes from "./src/modules/whatsApp/router.js";
import commonRoutes from "./src/modules/common/router.js";
import authRoutes from "./src/modules/auth/router.js";
import dotenv from "dotenv";
import { loadConfig } from './src/utils/configService.js'; // Adjust path as needed
import {types} from 'pg';

dotenv.config();

const app = express();

async function startServer() {
    try {
        console.log("Starting application...");
        
        // 1. Load and Cache Configuration (Crucial Step)
        types.setTypeParser(1114, (val) => val);

        await loadConfig(); 
        console.log("✅ WABA Configuration loaded successfully.");

        // 2. Middleware, Routes, etc.
        app.use(cors());              // ← 允许所有 frontend 访问
        app.use(express.json());      // ← 解析 JSON body

        // app.use(bodyParser.json());

        app.get("/", (req, res) => {
          res.send("Konosuba 2.0");
        });

        app.use("/whatsapp", whatsappRoutes);
        app.use("/common", commonRoutes);
        app.use("/auth", authRoutes);
        
        // 3. Start the HTTP server
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server listening on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("❌ Application startup failed! \nError reference:", error);
        process.exit(1);
    }
}

startServer(); 