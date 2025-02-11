import db from "../config/db.js";
import axios from "axios";
import * as cheerio from "cheerio";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Buffer } from "buffer";

// Necesario para manejar rutas en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL de la Wiki de Biomas en Fandom
const BIOMES_FANDOM_URL = "https://minecraft.fandom.com/wiki/Biome";

// Función para descargar la imagen y aplicar efectos visuales
const applyRandomEffect = async (imageUrl, name) => {
  try {
    if (!imageUrl || !imageUrl.startsWith("http")) {
      console.error(`❌ URL inválida para ${name}: ${imageUrl}`);
      return null;
    }

    console.log(`🔗 Descargando imagen de ${name}: ${imageUrl}`);

    const imagePath = path.join(__dirname, `${name}.jpg`);
    
    // Intentar descargar la imagen con un timeout de 5 segundos
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
      timeout: 5000  // 🔥 Evita bloqueos si la imagen no responde
    });

    if (!response.data) {
      console.error(`❌ No se pudo descargar la imagen para ${name}`);
      return null;
    }

    fs.writeFileSync(imagePath, Buffer.from(response.data));

    // Aplicar un efecto aleatorio
    const effects = ["greyscale", "invert", "blur"];
    const selectedEffect = effects[Math.floor(Math.random() * effects.length)];

    let processedImage = sharp(imagePath);

    if (selectedEffect === "greyscale") {
      processedImage = processedImage.greyscale();
    } else if (selectedEffect === "invert") {
      processedImage = processedImage.negate();
    } else if (selectedEffect === "blur") {
      processedImage = processedImage.blur(10);
    }

    const processedPath = path.join(__dirname, `${name}_processed.jpg`);
    await processedImage.toFile(processedPath);

    const finalImage = fs.readFileSync(processedPath, { encoding: "base64" });

    fs.unlinkSync(imagePath);
    fs.unlinkSync(processedPath);

    return `data:image/jpeg;base64,${finalImage}`;
  } catch (error) {
    console.error(`❌ Error al procesar la imagen para ${name}:`, error.message);
    return null;
  }
};

// Scraping de Biomas desde Fandom
const scrapeBiomes = async () => {
  try {
    console.log("🔄 Scrapear datos de la Wiki de Minecraft Fandom...");

    const { data } = await axios.get(BIOMES_FANDOM_URL);
    const $ = cheerio.load(data);
    const biomes = [];

    const rows = $(".wikitable tbody tr");
    for (const element of rows) {
      const columns = $(element).find("td");
      const name = $(columns.first()).text().trim();
      let imageElement = $(columns).find("img");

      if (imageElement.length === 0) {
        console.warn(`⚠ No se encontró imagen para el bioma: ${name}`);
        continue; // Changed from return to continue
      }

      let image = imageElement.attr("data-src") || imageElement.attr("src");

      // Verificar si la URL de la imagen es válida
      if (!image || !image.startsWith("http")) {
        image = `https:${image}`;
      }

      console.log(`✅ Bioma encontrado: ${name}, URL Imagen: ${image}`);

      const processedImage = await applyRandomEffect(image, name);
      if (!processedImage) {
        console.warn(`⚠ No se pudo procesar la imagen para ${name}`);
        continue; // Changed from return to continue
      }

      biomes.push({ type: "bioma", name, image: processedImage, attempts: 0 });
    }

    return biomes;
  } catch (error) {
    console.error("❌ Error al scrapear biomas desde Fandom:", error.message);
    return [];
  }
};

// Función principal para agregar desafíos a Firestore
const addChallenges = async () => {
  try {
    const biomes = await scrapeBiomes();

    if (biomes.length === 0) {
      console.log("❌ No se encontraron datos en la Wiki.");
      return;
    }

    console.log(`✅ ${biomes.length} desafíos obtenidos. Guardando en Firestore...`);

    for (const challenge of biomes) {
      await db.collection("challenges").add({
        ...challenge,
        date: new Date()
      });
      console.log(`✅ Desafío agregado: ${challenge.name}`);
    }

    console.log("🔥 Todos los desafíos han sido agregados a Firestore.");
  } catch (error) {
    console.error("❌ Error al agregar desafíos:", error.message);
  }
};

// Ejecutar la función
addChallenges();
