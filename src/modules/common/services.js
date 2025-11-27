import pool from "../../../db.js"
import { selectAllConfig, selectConfigByCategory,updateConfigValueByName } from "./sql.js";
import dotenv from "dotenv";

dotenv.config();

class CommonService {

  async getAllConfig() {

    const result = await pool.query(selectAllConfig);
    
    console.log('result: ', result)

    return result.rows;
  }

  async getConfigByCategory(category) {

    const result = await pool.query(selectConfigByCategory, [category]);

    console.log('result: ', result)

    return result.rows;
  }

  async updateConfigValueByName(value, name) {

    const result = await pool.query(updateConfigValueByName, [value,name]);

    console.log('result: ', result)

    return result.rows;
  }
}

export default new CommonService();
