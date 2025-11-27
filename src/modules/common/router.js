import express from "express";
import {commonController} from "./controller.js";

const router = express.Router();

router.get(`/allConfig`, commonController.getAllConfig); 

export default router;
