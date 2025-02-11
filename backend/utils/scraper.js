import axios from "axios";
import * as cheerio from "cheerio";

// URLs de la Wiki
const MOBS_URL = "https://es.minecraft.wiki/w/Criatura";
const BIOMES_URL = "https://es.minecraft.wiki/w/Bioma";
const ITEMS_URL = "https://es.minecraft.wiki/w/Ítem";

// Scraping de Mobs
export const scrapeMobs = async () => {
  try {
    const { data } = await axios.get(MOBS_URL);
    const $ = cheerio.load(data);
    const mobs = [];

    $(".wikitable tbody tr").each((index, element) => {
      const columns = $(element).find("td");
      const name = $(columns[0]).text().trim(); // Nombre del mob

      if (name) {
        mobs.push({ name });
      }
    });

    return mobs;
  } catch (error) {
    console.error("Error al scrapear los mobs:", error);
    return [];
  }
};

// Scraping de Biomas
export const scrapeBiomes = async () => {
  try {
    const { data } = await axios.get(BIOMES_URL);
    const $ = cheerio.load(data);
    const biomes = [];

    $(".wikitable tbody tr").each((index, element) => {
      const columns = $(element).find("td");
      const name = $(columns[0]).text().trim(); // Nombre del bioma

      if (name) {
        biomes.push({ name });
      }
    });

    return biomes;
  } catch (error) {
    console.error("Error al scrapear los biomas:", error);
    return [];
  }
};

// Scraping de Ítems
export const scrapeItems = async () => {
  try {
    const { data } = await axios.get(ITEMS_URL);
    const $ = cheerio.load(data);
    const items = [];

    $(".wikitable tbody tr").each((index, element) => {
      const columns = $(element).find("td");
      const name = $(columns[0]).text().trim(); // Nombre del ítem

      if (name) {
        items.push({ name });
      }
    });

    return items;
  } catch (error) {
    console.error("Error al scrapear los ítems:", error);
    return [];
  }
};
