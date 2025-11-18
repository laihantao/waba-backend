import { WABA_API } from "../../utils/axios.js";

class WhatsAppService {
  // 发送纯文本 Message（Session, when user reply to business account, only can send this
  async sendText(to, text) {
    return WABA_API.post("/messages", {
      messaging_product: "whatsapp",
      to,
      text: { body: text },
    });
  }

  // 发送 Template
  async sendTemplate(to, templateName, lang = "en_US") {
    return WABA_API.post("/messages", {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: { code: lang },
      },
    });
  }
}

export default new WhatsAppService();
