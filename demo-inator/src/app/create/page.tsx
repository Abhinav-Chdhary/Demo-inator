// src/app/create/page.tsx
"use client";
import { motion } from "framer-motion";
// Helpers
import { useVideoStore } from "@/lib/store"; // Import the store
// Components
import { Upload } from "../../components/03_compounds/Upload";
import { VideoEditor } from "@/components/05_templates/VideoEditor";

export default function Create() {
  // Zustand
  const file = useVideoStore((state) => state.file);

  return (
    <div
      className={
        file
          ? "w-full bg-background"
          : "flex items-center justify-center min-h-screen bg-background p-4"
      }
    >
      <motion.div
        key={file ? "file-present" : "no-file"} // Add key for nice transition
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={file ? "w-full" : ""}
      >
        {/* Conditionally render based on file state */}
        {file ? (
          <VideoEditor />
        ) : (
          // Upload component when no file is selected
          <Upload />
        )}
      </motion.div>
    </div>
  );
}
