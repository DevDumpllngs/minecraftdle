import { scrapeItems } from "../utils/scraper.js";

export const getItems = async (req, res) => {
  try {
    console.log("📌 Buscando items desde la web...");

    const items = await scrapeItems();
    
    if (!items || items.length === 0) {
      return res.status(404).json({ error: "No se encontraron items." });
    }

    console.log(`✅ Se encontraron ${items.length} items.`);
    res.json(items);
  } catch (error) {
    console.error("❌ Error al obtener items:", error);
    res.status(500).json({ error: "Error al obtener los items." });
  }
};
