import express from "express";
import { getBiomes } from "../controllers/biomeController.js";

const router = express.Router();
router.get("/", getBiomes);

export default router;
