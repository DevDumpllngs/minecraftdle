import db from "../config/db.js";

const deleteEmptyChallenges = async () => {
  try {
    console.log("🔄 Buscando desafíos vacíos en Firestore...");

    const challengesRef = db.collection("challenges");
    const snapshot = await challengesRef.get();

    let deletedCount = 0;

    snapshot.forEach(async (doc) => {
      const data = doc.data();

      // Si el desafío no tiene nombre o imagen, eliminarlo
      if (!data.name || !data.image) {
        await challengesRef.doc(doc.id).delete();
        console.log(`🗑 Eliminado desafío vacío con ID: ${doc.id}`);
        deletedCount++;
      }
    });

    if (deletedCount === 0) {
      console.log("✅ No se encontraron desafíos vacíos.");
    } else {
      console.log(`🔥 Se eliminaron ${deletedCount} desafíos vacíos.`);
    }
  } catch (error) {
    console.error("❌ Error al eliminar desafíos vacíos:", error.message);
  }
};

// Ejecutar la función
deleteEmptyChallenges();
