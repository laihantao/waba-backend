import express from "express";
import {whatsAppController} from "../whatsApp/controller.js";

const router = express.Router();

router.get("/webhook", whatsAppController.verifyWebhook);   // Verify
router.post("/webhook", whatsAppController.receiveMessage); // Receive incoming messages
router.get("/test-template", whatsAppController.sendTestTemplate);
router.post("/test-text", whatsAppController.sendTestText);

export default router;
