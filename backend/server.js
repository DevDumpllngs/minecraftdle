import "dotenv/config";
import express from "express";
import cors from "cors";

// 🔹 Importar rutas
import challengeRoutes from "./routes/challengeRoutes.js";
import biomeRoutes from "./routes/biomeRoutes.js";
import mobRoutes from "./routes/mobRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

// 🔹 Importar la actualización automática de desafíos
import updateDailyChallenges from "./utils/dailyChallengeUpdater.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Rutas principales
app.use("/challenge", challengeRoutes);
app.use("/biomes", biomeRoutes);
app.use("/mobs", mobRoutes);
app.use("/items", itemRoutes);
app.use("/stats", statsRoutes);

// 🔹 Iniciar la actualización de desafíos a las 00:00
const scheduleDailyUpdate = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0); // ⏰ Próxima medianoche

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(() => {
    updateDailyChallenges(); // 🔥 Ejecutar actualización a las 00:00
    setInterval(updateDailyChallenges, 24 * 60 * 60 * 1000); // 🔄 Ejecutar cada 24 horas
  }, timeUntilMidnight);
};

// 🔹 Ejecutar actualización y programar futuras ejecuciones
updateDailyChallenges();
scheduleDailyUpdate();

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
