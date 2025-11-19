import express from "express";
import cors from "cors";    
import whatsappRoutes from "./src/modules/whatsApp/router.js";
import {config} from "./config/index.js"

const app = express();

app.use(cors());              // ← 允许所有 frontend 访问
app.use(express.json());      // ← 解析 JSON body

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Server is Running :)");
});

app.use("/", whatsappRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Bot running on http://localhost:${config.PORT}`)
);
