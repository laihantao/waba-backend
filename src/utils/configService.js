import CommonService from "../modules/common/services.js"

let whatsappConfig = null;

export async function loadConfig() {
    console.log("Loading WABA configuration from DB...");
    // Replace with your actual database query
    const dbConfigs = await CommonService.getConfigsByCategory("whatsapp"); 

    // Transform array into an easily accessible object
    whatsappConfig = dbConfigs.reduce((acc, config) => {
        acc[config.name] = config.value;
        return acc;
    }, {});
    return whatsappConfig;
}

export function getConfig(key) {
    if (!whatsappConfig) {
        throw new Error("WABA configuration not loaded. Call loadConfig() first.");
    }
    return whatsappConfig[key];
}
