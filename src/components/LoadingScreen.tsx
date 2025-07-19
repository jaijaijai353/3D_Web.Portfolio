import React from "react";
import { motion } from "framer-motion";

const dotVariants = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-semibold text-gray-800 flex items-center">
        Loading
        <span className="flex space-x-1 ml-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 bg-gray-800 rounded-full"
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </span>
      </h1>
    </div>
  );
}
