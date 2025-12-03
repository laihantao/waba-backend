import express from "express";
import {commonController} from "./controller.js";

const router = express.Router();

router.get(`/allConfig`, commonController.getAllConfig); 
router.get(`/getConfigsByCategory`, commonController.getConfigByCategory); 

router.post(`/updateConfigValueByName`, commonController.updateConfigValueByName); 

export default router;
