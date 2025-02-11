import express from "express";
import { getMobs } from "../controllers/mobController.js";

const router = express.Router();

router.get("/", getMobs);

export default router;
