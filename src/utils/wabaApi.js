import axios from "axios";
import { getConfig } from "./configService.js"; 

export function createWabaAxios(wabaSpecificId) {
    const WHATSAPP_TOKEN = getConfig("waba_access_token"); 
    const WABA_VERSION = getConfig("waba_version");

    // The wabaSpecificId is either wabaId or phoneNumberId, provided by the service function
    const baseURL = `https://graph.facebook.com/${WABA_VERSION}/${wabaSpecificId}`; 

    return axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            "Content-Type": "application/json",
        },
    });
}