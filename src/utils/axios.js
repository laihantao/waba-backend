import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const WABA_API = axios.create({
  baseURL: `https://graph.facebook.com/${process.env.WABA_VERSION}`,
  headers: {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    "Content-Type": "application/json",
  },
});


