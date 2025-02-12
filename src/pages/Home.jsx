import { motion } from "framer-motion";
import GameModeCard from "../components/GameModeCard";

const Home = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      {/* Fondo de pantalla completa */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.8,
        }}
      />

      {/* Contenedor invisible */}
      <main className="relative z-10 container mx-auto px-4" style={{ background: "none", backdropFilter: "none" }}>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-8" style={{ background: "none", backdropFilter: "none" }}>
          {/* Logo con animación */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img 
              src="/logo.png" 
              alt="MCDLE Logo"
              className="w-[280px] md:w-[320px] drop-shadow-xl"
              animate={{ 
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0, -1, 0],
              }} 
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* DAILY WORD Text */}
          <motion.h2
            className="text-center text-yellow-400 text-xl mb-4 font-minecraft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            DAILY WORD
          </motion.h2>

          {/* Subtítulo */}
          <motion.h2
            className="text-xl text-yellow-400 font-minecraft mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Elige un modo de juego
          </motion.h2>

          {/* Grid de tarjetas de juego */}
          <motion.div 
            className="grid gap-3 w-full max-w-lg"
            style={{ background: "none", backdropFilter: "none" }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <GameModeCard 
                title="Criaturas" 
                description="Adivina la criatura de hoy" 
                image="/mob.png" 
                link="/mobs" 
                textColor="text-orange-400"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <GameModeCard 
                title="Bloques" 
                description="Adivina el bloque de hoy" 
                image="/block.png" 
                link="/biomes" 
                textColor="text-white"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <GameModeCard 
                title="Objetos" 
                description="Adivina el objeto de hoy" 
                image="/sword.png" 
                link="/items" 
                textColor="text-orange-400"
              />
            </motion.div>
            
            <motion.div variants={item}>
              <GameModeCard 
                title="Bestiario" 
                description="Sigue tu progreso y colecciona lo descubierto" 
                image="/book.png" 
                link="/stats" 
                textColor="text-orange-400"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Home;
