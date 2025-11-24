// src/components/04_organisms/TopBar.tsx
"use client";
import { useRef, useState } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
// Helpers
import { useVideoStore } from "@/lib/store";
import { processVideoWithBackground } from "@/components/helpers/videoProcessor";
// Components
import { Button } from "@/components/ui/button";

export function TopBar() {
  // Zustand
  const { file, clearFile, backgroundColor } = useVideoStore((state) => state);

  // Local state
  const [isProcessing, setIsProcessing] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  // Function to trigger file download
  const handleExport = async () => {
    if (!file) {
      console.log("No file selected to export.");
      return;
    }

    // If no background color is selected, download original file
    if (!backgroundColor) {
      downloadFile(file);
      return;
    }

    // If background color is selected, process with FFmpeg
    setIsProcessing(true);
    try {
      const processedBlob = await processVideoWithBackground(
        file,
        backgroundColor,
        ffmpegRef.current
      );

      if (processedBlob) {
        // Create a new File object for download
        const fileExtension = file.name.split(".").pop();
        const newFile = new File(
          [processedBlob],
          `processed_${file.name}`,
          { type: file.type }
        );
        downloadFile(newFile);
      }
    } catch (error) {
      console.error("Export failed:", error);
      // Ideally show a toast or error message here
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (fileToDownload: File | Blob) => {
    // Create an object URL for the file
    const url = URL.createObjectURL(fileToDownload);

    // Create a temporary anchor element
    const a = document.createElement("a");
    a.href = url;
    // @ts-ignore
    a.download = fileToDownload.name || "video.mp4";
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
        <Button size="sm" onClick={handleExport} disabled={isProcessing}>
          {/* Icon */}
          {isProcessing ? (
            <Loader2 className="mr-0 h-4 w-4 sm:mr-2 animate-spin" />
          ) : (
            <Download className="mr-0 h-4 w-4 sm:mr-2" />
          )}

          {/* Text */}
          <span className="hidden sm:inline">
            {isProcessing ? "Processing..." : "Export"}
          </span>
        </Button>
      </div>
    </div>
  );
}
