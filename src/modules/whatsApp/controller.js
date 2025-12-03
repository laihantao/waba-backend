import WhatsAppService from "./services.js"
import dotenv from "dotenv";

dotenv.config();

export class WhatsAppController {
  constructor() {
    this.messageService  = WhatsAppService;
  }

  getMessageTemplate = async (req, res) => {
    try {
      const response = await this.messageService.getMessageTemplate();

      return res.json(response.data);
    } 
    catch (err) {
      console.error("\nController - getMessageTemplate:", err.response?.data || err.message);

      const status = err.response?.status || 500;
      const message = err.response?.data?.error || err.message || "Unknown error";

      return res.status(status).json({
        success: false,
        error: message,
      });
    }
  };


  // GET /webhook
  verifyWebhook = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
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
  sendTemplate = async (req, res) => {
    try {
      const to = req.body.to;
      const template = req.body.templateName;

      console.log('Send Template Param: ', req.body)

      const result = await this.messageService.sendTemplate(to, template);

      return res.status(200).json({
        data: result.data,
      });
    } 
    catch (err) {
      console.error("\nWhatsAppController - sendTemplate:", err.response?.data || err.message);

      const status = err.response?.status || 500;
      const message = err.response?.data?.error || err.message || "Unknown error";

      return res.status(status).json({
        error: message,
      });
    }
  };

  // GET /test-text?to=...
  sendTestText = async (req, res) => {
    try {
      const to = req.body.to;
      const text = req.body.text;
      const paramValues = req.body.paramValues;

      console.log("req.body: ",req.body)
      // await this.messageService.sendText(to, "Hello, this is a test text message!");
      const result = await this.messageService.sendText(to, text, "en_US");
      console.log('result: ', result)
      return res.send("Text message sent!");
    } 
    catch (err) {
      console.error("\nController - sendTestText:", err.response?.data || err.message);

      const status = err.response?.status || 500;
      const message = err.response?.data?.error || err.message || "Unknown error";

      return res.status(status).json({
        success: false,
        error: message,
      });
    }
  };

}

// 创建一个实例导出
export const whatsAppController = new WhatsAppController();
