"use client";

import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaSun, FaMoon } from "react-icons/fa";

import { useTheme } from "@/contexts/ThemeContext";

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="p-4 sm:p-6 bg-surface/50 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaChartLine className="text-primary text-2xl" />
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Crypto Dashboard
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-text-secondary hover:bg-surface-secondary transition-colors"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90, y: 10 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: 90, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FaMoon size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90, y: 10 }}
                animate={{ opacity: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, rotate: -90, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <FaSun size={20} className="text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
};

export default Header;
