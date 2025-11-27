import express from "express";
import cors from "cors";    
import whatsappRoutes from "./src/modules/whatsApp/router.js";
import commonRoutes from "./src/modules/common/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());              // ← 允许所有 frontend 访问
app.use(express.json());      // ← 解析 JSON body

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Konosubaaaaaaaaa");
});

app.use("/whatsapp", whatsappRoutes);
app.use("/common", commonRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Bot running on http://localhost:${process.env.PORT}`)
);
 