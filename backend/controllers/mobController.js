import { scrapeMobs } from "../utils/scraper.js";

export const getMobs = async (req, res) => {
  try {
    console.log("📌 Buscando mobs desde la web...");

    const mobs = await scrapeMobs();
    
    if (!mobs || mobs.length === 0) {
      return res.status(404).json({ error: "No se encontraron mobs." });
    }

    console.log(`✅ Se encontraron ${mobs.length} mobs.`);
    res.json(mobs);
  } catch (error) {
    console.error("❌ Error al obtener mobs:", error);
    res.status(500).json({ error: "Error al obtener los mobs." });
  }
};
