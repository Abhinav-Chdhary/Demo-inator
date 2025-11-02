// src/components/03_compounds/Upload.tsx
"use client";
import { UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";
// Helpers
import { useVideoStore } from "@/lib/store";

export function Upload() {
  // Zustand
  const setFile = useVideoStore((state) => state.setFile);

  // States to manage file input
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle file selection or drop
  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      // Set the file in the global Zustand store
      setFile(file);
    }
  };

  // Function to handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Function to handle drag leave
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Function to handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  // Function to handle click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file input change
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };

  return (
    <div
      className={`flex w-full max-w-lg cursor-pointer flex-col items-center justify-center
      gap-4 rounded-xl border-2 border-dashed bg-card p-12 text-card-foreground
      shadow-sm transition-colors duration-200 ease-in-out
      ${
        isDragging
          ? "border-primary"
          : "border-muted-foreground/30 hover:border-primary/40"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        className="hidden"
        accept="video/mp4,video/x-m4v,video/*,.mov"
      />

      {/* Upload icon */}
      <UploadCloud
        className={`h-12 w-12 transition-colors ${
          isDragging ? "text-primary" : "text-muted-foreground/60"
        }`}
      />

      {/* Upload text */}
      <div className="text-center">
        {/* Title */}
        <p className="text-lg font-medium">Drag & drop your file here</p>
        {/* Description */}
        <p className="text-sm text-muted-foreground">
          or click to browse your PC.
        </p>
      </div>
    </div>
  );
}
