import db from "../config/db.js";
import sharp from "sharp";
import { Buffer } from "buffer";
import UserStats from "../models/UserStats.js"; // 🔥 Ahora usamos UserStats

// 🔹 Obtener el desafío diario de un tipo específico (bioma, mob, ítem)
const getChallenge = async (req, res) => {
  try {
    console.log("📌 getChallenge ejecutándose con type:", req.query.type);
    
    const today = new Date().toISOString().split("T")[0];
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({ error: "Debes especificar un tipo de desafío (bioma, mob, item)." });
    }

    const challengeRef = db.collection("dailyChallenge").doc(`${today}_${type}`);
    const snapshot = await challengeRef.get();

    if (snapshot.exists) {
      console.log("📌 Desafío encontrado:", snapshot.data());
      return res.json(snapshot.data());
    }

    return res.status(404).json({ error: `No hay desafío disponible para ${type} hoy.` });
  } catch (error) {
    console.error("❌ Error en getChallenge:", error);
    res.status(500).json({ error: "Error al obtener el desafío." });
  }
};

// 🔹 Verificar respuesta del usuario y reducir blur
const checkAnswer = async (req, res) => {
  const { guess, userId, type } = req.body;
  const today = new Date().toISOString().split("T")[0];

  if (!guess || !userId || !type) {
    return res.status(400).json({ error: "Debes enviar un usuario, un tipo y un bioma." });
  }

  try {
    const challengeRef = db.collection("dailyChallenge").doc(`${today}_${type}`);
    const challengeDoc = await challengeRef.get();

    if (!challengeDoc.exists) {
      return res.status(404).json({ error: "No hay desafío asignado para hoy." });
    }

    const challenge = challengeDoc.data();
    const correct = guess.toLowerCase().trim() === challenge.name.toLowerCase().trim();

    // Referencia a los intentos del usuario
    const userAttemptsRef = db.collection("userAttempts").doc(`${userId}_${today}_${type}`);
    const userAttemptsDoc = await userAttemptsRef.get();

    // Referencia a las estadísticas del usuario
    const userStatsRef = db.collection("userStats").doc(userId);
    const userStatsDoc = await userStatsRef.get();

    let attempts = userAttemptsDoc.exists ? userAttemptsDoc.data().attempts : 0;
    let userImage = userAttemptsDoc.exists ? userAttemptsDoc.data().image : challenge.image;
    let correctGuesses = userStatsDoc.exists ? userStatsDoc.data().correctGuesses : 0;

    if (correct) {
      correctGuesses++; // Aumentar las adivinanzas correctas
      await userStatsRef.set(new UserStats(userId, attempts, correctGuesses));
      
      return res.json({ correct: true, message: "¡Correcto! Has adivinado el bioma.", correctGuesses });
    }

    attempts++;

    let blurLevel = 10 - Math.floor((attempts / 15) * 10);
    if (attempts >= 15) blurLevel = 0;

    if (blurLevel > 0) {
      userImage = await applyBlurEffect(challenge.image, blurLevel);
    }

    // Guardar los intentos del usuario junto con su versión de la imagen
    await userAttemptsRef.set({ attempts, image: userImage });

    // Actualizar estadísticas del usuario
    await userStatsRef.set(new UserStats(userId, attempts, correctGuesses));

    return res.json({
      correct: false,
      message: `Incorrecto, sigue intentando. Intento ${attempts}.`,
      attempts,
      blurLevel,
      image: userImage,
      correctGuesses
    });

  } catch (error) {
    console.error("❌ Error en checkAnswer:", error);
    res.status(500).json({ error: "Error al verificar la respuesta." });
  }
};

// 🔹 Función para aplicar el efecto de blur progresivo
const applyBlurEffect = async (base64Image, blurLevel) => {
  try {
    const buffer = Buffer.from(base64Image.split(",")[1], "base64");

    const processedImage = await sharp(buffer)
      .blur(blurLevel)
      .toBuffer();

    return `data:image/jpeg;base64,${processedImage.toString("base64")}`;
  } catch (error) {
    console.error("❌ Error al procesar la imagen con blur:", error);
    return base64Image;
  }
};

export { getChallenge, checkAnswer };
