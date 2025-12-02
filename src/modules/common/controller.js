import CommonService from "./services.js"
import dotenv from "dotenv";
import pool from "../../../db.js"

dotenv.config();

export class CommonController {
  constructor() {
    this.service  = CommonService;
  }

  getAllConfig = async (req, res) => {
    try {

      const data = await this.service.getAllConfig();

      console.log('Data from SQL: ', data)
      
      return res.status(200).json({
        success: true,
        total: data?.length ?? 0,
        data,
      });

    } catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "getAllConfig: Failed to fetch data",
      });
    }
  };

  getConfigByCategory = async (req, res) => {
    try {

      if (!req.query?.category) {
        return res.status(400).json({
          success: false,
          message: "getConfigByCategory: Missing required query parameter: category",
        });
      }

      const data = await this.service.getConfigsByCategory(req.query.category);

      console.log('Data from SQL: ', data)
      
      return res.status(200).json({
        success: true,
        total: data?.length ?? 0,
        data,
      });

    } catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "getConfigByCategory: Failed to fetch data",
      });
    }
  };

  getConfigByName = async (req, res) => {
    try {

      if (!req.query?.category) {
        return res.status(400).json({
          success: false,
          message: "getConfigByName: Missing required query parameter: Name",
        });
      }

      const data = await this.service.getConfigByName(req.query.name);

      console.log('Data from SQL: ', data)
      
      return res.status(200).json({
        success: true,
        total: data?.length ?? 0,
        data,
      });

    } catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "getConfigByName: Failed to fetch data",
      });
    }
  };

  updateConfigValueByName = async (req, res) => {
    try {
      if (!req.body?.name) {
        return res.status(400).json({
          success: false,
          message: "getConfigByCategory: Missing required body parameter: name",
        });
      }

      if (!req.body?.value) {
        return res.status(400).json({
          success: false,
          message: "getConfigByCategory: Missing required body parameter: value",
        });
      }

      const data = await this.service.updateConfigValueByName(req.body);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Config not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: data,
      });

    } 
    catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "updateConfigValueByName: Failed to fetch data",
      });
    }
  };

}

export const commonController = new CommonController();
