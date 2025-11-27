import { WABA_API } from "../../utils/axios.js";
import dotenv from "dotenv";

dotenv.config();

class WhatsAppService {

  async getMessageTemplate() {

    const url = `/${process.env.WABA_ID}/message_templates?access_token=${process.env.WHATSAPP_TOKEN}`;

    console.log("url: ", url)

    return WABA_API.get(`/${process.env.WABA_ID}/message_templates`, {

    });
  }

  // 发送纯文本 Message（Session, when user reply to business account, only can send this
  async sendText(to, text) {
    return WABA_API.post(`/${process.env.WABA_ID}/messages`, {
      messaging_product: "whatsapp",
      to,
      text: { body: text },
    });
  }

  // 发送 Template
  async sendTemplate(to, template, lang = "en_US") {

    console.log("sendTemplate- to: ", to)
    console.log("sendTemplate- template: ", template)

    return WABA_API.post(`/${process.env.PHONE_NUMBER_ID}/messages`, {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: template,
        language: { code: lang },
      },
    });
  }
}

export default new WhatsAppService();
