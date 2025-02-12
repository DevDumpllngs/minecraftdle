import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GameModeCard = ({ title, description, image, link, textColor = "text-primary" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full max-w-md group"
    >
      <Link to={link}>
        {/* Efecto de brillo en hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
        
        {/* Card principal */}
        <div className="relative flex items-center bg-black/90 p-6 rounded-xl border-2 border-gray-800 group-hover:border-yellow-400/50 transition-all duration-300">
          {/* Contenedor de imagen con efecto de brillo */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg blur opacity-25"></div>
            <div className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-3 shadow-2xl">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
          
          {/* Contenido de texto */}
          <div className="ml-6 flex-1">
            <h3 className={`text-xl font-bold mb-1 ${textColor} group-hover:text-yellow-400 transition-colors duration-300`}>
              {title}
            </h3>
            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
              {description}
            </p>
          </div>
          
          {/* Flecha indicadora */}
          <div className="ml-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            <svg 
              className="w-6 h-6 text-yellow-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default GameModeCard;