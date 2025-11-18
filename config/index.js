import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  WHATSAPP: {
    VERSION: process.env.VERSION,
    VERIFY_TOKEN: process.env.VERIFY_TOKEN,
    PHONE_ID: process.env.PHONE_NUMBER_ID,
    TOKEN: process.env.WHATSAPP_TOKEN
  }
};
