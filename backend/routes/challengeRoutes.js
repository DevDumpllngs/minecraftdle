import express from "express";
import { getChallenge, checkAnswer } from "../controllers/challengeController.js";

const router = express.Router();

// 🔹 Verificar que la ruta se está ejecutando
router.get("/", (req, res) => {
  console.log("✅ Ruta GET /challenge ejecutándose con type:", req.query.type);
  getChallenge(req, res);
});

// 🔹 Verificar la respuesta del usuario
router.post("/guess", (req, res) => {
  console.log("✅ Ruta POST /challenge/guess ejecutándose");
  checkAnswer(req, res);
});

export default router;
