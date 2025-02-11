import express from "express";
import { saveUserAttempt } from "../controllers/statsController.js";

const router = express.Router();
router.post("/save", saveUserAttempt);

export default router;
