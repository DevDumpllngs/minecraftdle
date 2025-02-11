import db from "../config/db.js";

export const saveUserAttempt = async (req, res) => {
  const { userId, challengeType, guess, correct } = req.body;

  if (!userId || !challengeType || !guess) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    console.log(`📌 Guardando intento del usuario ${userId} en ${challengeType}`);

    await db.collection("userStats").add({
      userId,
      challengeType,
      guess,
      correct,
      timestamp: new Date(),
    });

    console.log("✅ Intento guardado correctamente.");
    res.json({ success: true, message: "Intento guardado" });
  } catch (error) {
    console.error("❌ Error al guardar intento:", error);
    res.status(500).json({ error: "Error al guardar intento" });
  }
};
