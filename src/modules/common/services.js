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

  async getConfigsByCategory({category}) {
    try {
      console.log('param: ', param)
      const result = await pool.query(selectConfigByCategory, [category]);

      return result.rows;

    } catch (err) {
      console.error("getConfigByCategory: DB error:", err);
      throw err;
    }
  }

  async updateConfigValueByName({value, name}) {
    try {
      console.log('value: ', value)
      console.log('name: ', name)
      const result = await pool.query(sqlUpdateConfigValueByName, [value,name]);

      return result.rowCount;
    }
    catch (err) {
      console.error("updateConfigValueByName: DB error:", err);
      throw err;
    }
  }
}

export default new CommonService();
