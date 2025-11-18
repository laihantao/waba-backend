import axios from "axios";
import { config } from "../../config/index.js";

export const WABA_API = axios.create({
  baseURL: `https://graph.facebook.com/${config.WHATSAPP.VERSION}/${config.WHATSAPP.PHONE_ID}`,
  headers: {
    Authorization: `Bearer ${config.WHATSAPP.TOKEN}`,
    "Content-Type": "application/json",
  },
});


