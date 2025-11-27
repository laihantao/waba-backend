import CommonService from "./services.js"
import dotenv from "dotenv";

dotenv.config();

export class CommonController {
  constructor() {
    this.service  = CommonService;
  }

  getAllConfig = async (req, res) => {
    try {
      const response = await this.service.getAllConfig();
      return res.json(response.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      return res.status(500).send("Failed to fetch config");
    }
  };


}

export const commonController = new CommonController();
