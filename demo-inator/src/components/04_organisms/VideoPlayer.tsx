// src/components/04_organisms/VideoPlayer.tsx
"use client";
import { FileVideo, X } from "lucide-react";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Button } from "@/components/ui/button";

export function VideoPlayer() {
  // Zustand
  const { file, clearFile } = useVideoStore((state) => state);

  return (
    <div className="h-full w-full rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
      Video Player
    </div>
  );
}
