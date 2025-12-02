import pool from "../../../db.js"
import { selectAllConfig, selectConfigByCategory,sqlUpdateConfigValueByName, selectConfigByName } from "./sql.js";
import dotenv from "dotenv";

dotenv.config();

class CommonService {

  async getAllConfig() {
    try {
      const result = await pool.query(selectAllConfig);

      return result.rows;

    } catch (err) {
      console.error("getAllConfig: DB error:", err);
      throw err;
    }
  }

  async getConfigsByCategory(category) {
    try {
      const result = await pool.query(selectConfigByCategory, [category]);

      return result.rows;

    } catch (err) {
      console.error("getConfigByCategory: DB error:", err);
      throw err;
    }
  }

  async getConfigsByName(name) {
    try {
      console.log('param: ', param)
      const result = await pool.query(selectConfigByName, [name]);

      return result.rows;

    } catch (err) {
      console.error("getConfigsByName: DB error:", err);
      throw err;
    }
  }

  async updateConfigValueByName({value, name}) {
    try {
      const result = await pool.query(sqlUpdateConfigValueByName, [value,name]);

      return result.rows;
    }
    catch (err) {
      console.error("updateConfigValueByName: DB error:", err);
      throw err;
    }
  }
}

export default new CommonService();
