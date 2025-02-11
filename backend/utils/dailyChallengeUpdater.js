import db from "../config/db.js";

const updateDailyChallenges = async () => {
  try {
    console.log("🔄 Actualizando desafíos diarios...");

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const types = ["bioma", "mob", "item"];

    // 🔹 Eliminar desafíos del día anterior
    for (const type of types) {
      const oldChallengeRef = db.collection("dailyChallenge").doc(`${yesterdayStr}_${type}`);
      const oldChallengeSnapshot = await oldChallengeRef.get();

      if (oldChallengeSnapshot.exists) {
        await oldChallengeRef.delete();
        console.log(`🗑️ Eliminado desafío viejo: ${yesterdayStr}_${type}`);
      }
    }

    // 🔹 Generar nuevos desafíos
    for (const type of types) {
      console.log(`📌 Buscando desafíos de tipo: ${type}`);

      const challengesSnapshot = await db.collection("challenges").where("type", "==", type).get();
      const challenges = challengesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (challenges.length === 0) {
        console.log(`❌ No hay desafíos disponibles para ${type}`);
        continue;
      }

      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      console.log(`✅ Desafío seleccionado para ${type}: ${randomChallenge.name}`);

      await db.collection("dailyChallenge").doc(`${today}_${type}`).set(randomChallenge);
      console.log(`✅ Nuevo desafío guardado en Firestore para ${type}`);
    }

    console.log("✅ Desafíos actualizados correctamente.");
  } catch (error) {
    console.error("❌ Error al actualizar los desafíos diarios:", error);
  }
};

// 🔹 Si el archivo se ejecuta manualmente, actualizará los desafíos inmediatamente
if (process.argv[1] === import.meta.url.replace("file://", "")) {
  updateDailyChallenges();
}

export default updateDailyChallenges;
