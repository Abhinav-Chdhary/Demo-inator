// src/components/04_organisms/TopBar.tsx
"use client";
import { X, Download } from "lucide-react";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Button } from "@/components/ui/button";

export function TopBar() {
  // Zustand
  const { file, clearFile } = useVideoStore((state) => state);

  // Function to trigger file download
  const handleExport = () => {
    if (!file) {
      console.log("No file selected to export.");
      return;
    }

    // Create an object URL for the file
    const url = URL.createObjectURL(file);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name; // Use the original file name for the download
    document.body.appendChild(a); // Append the link to the body

    // Programmatically click the link to trigger the download
    a.click();

    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-12 w-full items-center justify-between bg-card p-4 text-card-foreground shadow-sm">
      {/* Title */}
      <div className="text-lg font-light items-center">File | {file ? file.name : ""}</div>

      {/* File info & controls */}
      <div className="flex items-center gap-4">
        {/* File info */}
        <div className="flex items-center gap-2">
          {/* Clear file button */}
          <Button variant="outline" size="sm" onClick={clearFile}>
            {/* Icon */}
            <X className="mr-0 h-4 w-4 sm:mr-2" />

            {/* Text */}
            <span className="hidden sm:inline">Change file</span>
          </Button>
        </div>

        {/* Export Button */}
        <Button size="sm" onClick={handleExport}>
          {/* Icon */}
          <Download className="mr-0 h-4 w-4 sm:mr-2" />

          {/* Text */}
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </div>
  );
}
