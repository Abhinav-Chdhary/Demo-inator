// src/app/create/page.tsx
"use client";
import { motion } from "framer-motion";

export default function Create() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Create your demo
      </motion.div>
    </div>
  );
}
