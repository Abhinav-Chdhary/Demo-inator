// src/components/04_organisms/TimeLine.tsx
"use client";
import { FileVideo, X } from "lucide-react";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Button } from "@/components/ui/button";

export function TimeLine() {
  // Zustand
  const { file, clearFile } = useVideoStore((state) => state);

  return (
    <div className="h-full w-full rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
      Timeline
    </div>
  );
}
