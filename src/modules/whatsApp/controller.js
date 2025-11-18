import WhatsAppService from "./services.js"
import { config } from "../../../config/index.js";

export class WhatsAppController {
  constructor() {
    this.messageService  = WhatsAppService;
  }

  // GET /webhook
  verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === config.WHATSAPP.VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
  };

  // POST /webhook
  receiveMessage = async (req, res) => {
    try {
      const entry = req.body.entry?.[0]?.changes?.[0]?.value;
      const msg = entry?.messages?.[0];

      if (!msg) return res.sendStatus(200);

      const from = msg.from;
      const text = msg.text?.body;

      console.log("收到用户消息:", text);

      // 自动回复
      await this.messageService.sendText(from, `你刚刚说：${text}`);

      return res.sendStatus(200);
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  };

  // GET /test-template?to=...
  sendTestTemplate = async (req, res) => {
    try {
      const to = req.query.to;

      console.log('to: ', to)

      await this.messageService.sendTemplate(to, "hello_world");
      return res.send("Template sent!");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Send failed");
    }
  };

  // GET /test-text?to=...
  sendTestText = async (req, res) => {
    try {
      const to = req.body.to;
      const text = req.body.text;

      console.log("req.body: ",req.body)
      // await this.messageService.sendText(to, "Hello, this is a test text message!");
      await this.messageService.sendText(to, text);
      
      return res.send("Text message sent!");
    } catch (err) {
      console.error("SendText error:", err.response?.data || err.message);
      return res.status(500).send("Send failed");
    }
  };

}

// 创建一个实例导出
export const whatsAppController = new WhatsAppController();
