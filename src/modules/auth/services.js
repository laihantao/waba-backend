import pool from "../../../db.js"
import { loginValidation, sqlResetPassword } from "./sql.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class AuthService {

  async hashString(text){
    try{
      const result = await bcrypt.hash(text, 10);
      console.log('\nHash Text: ', result)
      return result;
    }
    catch (err) {
      console.error("hashString error:", err);
      throw err;
    }
  }

  async login({loginId, password}) {
    try {

      const result = await pool.query(loginValidation, [loginId]);
      console.log('result?.rows[0]: ', result?.rows[0])

      if (result?.rows?.length == 0){
        return {
          success: false,
          msg: "No such user found"
        }
      }

      const user = result?.rows[0]

      const isMatch = await bcrypt.compare(password, user?.password);

      console.log('\nloginId: ', loginId)
      console.log('password: ', password)

      if (!isMatch) {
        return {
          success: false,
          msg: "Incorrect Password"
        }
      }

      const payload = { userId: user?.id, name: user?.name, displayName: user?.displayName, isMasterAdmin: user?.isMasterAdmin };
      const secret = process.env.JWT_SECRET; // store in .env
      const options = { expiresIn: "1h" }; // or whatever duration you want

      const token = jwt.sign(payload, secret, options);

      return {
        success: true,
        token: token
      }
    }
    catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  } 

  async resetPassword ({id, oldPassword, newPassword}) {
    try {

      // const oldHashPassword = this.hashString(oldPassword)
      const newHashPassword = await this.hashString(newPassword)

      console.log('Reset Password - Id: ', id)
      console.log('Reset Password - HashPassword: ', newHashPassword)

      const result = await pool.query(sqlResetPassword, [id, newHashPassword]);

      console.log('\nresult: ', result)

      if (result?.rowCount !== 1){
        return {
          success: false
        }
      }

      return {
        success: true
      }
    }
    catch (err) {
      console.error("Update password error:", err);
      throw err;
    }
  }
}

export default new AuthService();
