import { scrapeBiomes } from "../utils/scraper.js";

export const getBiomes = async (req, res) => {
  try {
    console.log("📌 Buscando biomas desde la web...");

    const biomes = await scrapeBiomes();
    
    if (!biomes || biomes.length === 0) {
      return res.status(404).json({ error: "No se encontraron biomas." });
    }

    console.log(`✅ Se encontraron ${biomes.length} biomas.`);
    res.json(biomes);
  } catch (error) {
    console.error("❌ Error al obtener biomas:", error);
    res.status(500).json({ error: "Error al obtener los biomas." });
  }
};
