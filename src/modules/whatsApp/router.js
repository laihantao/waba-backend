import express from "express";
import {whatsAppController} from "../whatsApp/controller.js";

const router = express.Router();

router.get(`/message_templates`, whatsAppController.getMessageTemplate);   // Verify
router.get(`/webhook`, whatsAppController.verifyWebhook);   // Verify
router.post(`/webhook`, whatsAppController.receiveMessage); // Receive incoming messages
router.post(`/send-template`, whatsAppController.sendTemplate);
router.post(`/test-text`, whatsAppController.sendTestText);

export default router;
