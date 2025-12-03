import { getConfig } from "../../utils/configService.js";
import { createWabaAxios } from "../../utils/wabaApi.js";

class WhatsAppService {

    async getMessageTemplate() {
        // Get the specific ID needed from the cache
        const wabaId = getConfig("waba_id"); 
        // Create a dedicated Axios instance for this call
        const api = createWabaAxios(wabaId); 

        return await api.get(`/message_templates`); // baseURL already includes /vXX.X/wabaId
    }

    // Send Text Message
    async sendText(to, text) {

      const wabaId = getConfig("waba_phone_id");
        const api = createWabaAxios(wabaId);

        return await api.post(`/messages`, {
            messaging_product: "whatsapp",
            to,
            text: { body: text },
        });
    }

    // Send Template Message
    async sendTemplate(to, template, lang = "en_US") {
        // Get the specific ID needed from the cache
        const phoneNumberId = getConfig("waba_phone_id");
        // Create a dedicated Axios instance for this call
        const api = createWabaAxios(phoneNumberId); 

        console.log('\nphoneNumberId: ', phoneNumberId)

        return api.post(`/messages`, {
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
