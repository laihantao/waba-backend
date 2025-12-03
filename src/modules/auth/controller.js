import AuthService from "./services.js"
import dotenv from "dotenv";

dotenv.config();

export class AuthController {
  constructor() {
    this.service  = AuthService;
  }

  login = async (req, res) => {
    try {
      if (!req.body?.loginId) {
        return res.status(400).json({
          success: false,
          message: "Login: Missing required body parameter: username/ email",
        });
      }

      if (!req.body?.password) {
        return res.status(400).json({
          success: false,
          message: "Login: Missing required body parameter: password",
        });
      }

      const result = await this.service.login(req.body);

      if (!result?.success) {
        return res.status(404).json({
          success: false,
          message: result?.msg,
        });
      }

      return res.status(200).json({
        result
      });

    } 
    catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "Login Failed",
      });
    }
  };

  resetPassword = async (req, res) => {
    try {
      if (!req.body?.id) {
        return res.status(400).json({
          success: false,
          message: "resetPassword: Missing required body parameter: id",
        });
      }

      if (!req.body?.newPassword) {
        return res.status(400).json({
          success: false,
          message: "resetPassword: Missing required body parameter: newPassword",
        });
      }

      // if (!req.body?.oldPassword) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "resetPassword: Missing required body parameter: oldPassword",
      //   });
      // }

      const result = await this.service.resetPassword(req.body);

      if (!result?.success) {
        return res.status(404).json({
          success: false,
          message: "Failed to update password",
        });
      }

      return res.status(200).json({
        success: true,
      });

    } 
    catch (err) {

      console.error(err.response?.data || err.message);

      return res.status(500).json({
        success: false,
        message: "Update password Failed",
      });
    }
  };
}

export const authController = new AuthController();
