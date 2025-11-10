import { FC } from "react";
import { motion } from "framer-motion";
import { FaBitcoin } from "react-icons/fa";

const Preloader: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <FaBitcoin className="text-primary" size={80} />
      </motion.div>
    </div>
  );
};

export default Preloader;
