// src/app/create/page.tsx
"use client";
import { motion } from "framer-motion";
// Helpers
import { useVideoStore } from "@/lib/store"; // Import the store
// Components
import { Upload } from "../../components/Upload";
import { Button } from "@/components/ui/button"; // Assuming you have shadcn button
import { FileVideo, X } from "lucide-react";

export default function Create() {
  // Zustand
  const file = useVideoStore((state) => state.file);
  const clearFile = useVideoStore((state) => state.clearFile);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <motion.div
        key={file ? "file-present" : "no-file"} // Add key for nice transition
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Conditionally render based on file state */}
        {file ? (
          <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border border-border bg-card p-12 text-card-foreground shadow-sm">
            {/* Video file icon */}
            <FileVideo className="h-12 w-12 text-primary" />

            {/* Video file name */}
            <div className="text-center">
              {/* Info text */}
              <p className="text-lg font-medium">File ready for editing:</p>

              {/* File name */}
              <p className="max-w-full truncate text-sm text-muted-foreground">
                {file.name}
              </p>
            </div>

            {/* Upload button */}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFile}
              className="mt-4"
            >
              <X className="mr-2 h-4 w-4" /> Upload a different file
            </Button>
            {/* Editor here */}
          </div>
        ) : (
          // Upload component when no file is selected
          <Upload />
        )}
      </motion.div>
    </div>
  );
}
