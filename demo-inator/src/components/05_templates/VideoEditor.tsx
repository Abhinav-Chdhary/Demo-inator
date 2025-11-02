// src/components/05_templates/VideoEditor.tsx
"use client";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { TopBar } from "../04_organisms/TopBar";
import { VideoPlayer } from "../04_organisms/VideoPlayer";
import { TimeLine } from "../04_organisms/TimeLine";
import { SideBar } from "../04_organisms/SideBar";

export function VideoEditor() {
  // Zustand
  const { file, clearFile } = useVideoStore((state) => state);

  return (
    <div className="grid h-screen w-full grid-cols-[300px_1fr] grid-rows-[auto_1fr_auto] gap-2 p-2">
      {/* Top Bar: Spans both columns */}
      <div className="col-span-2">
        <TopBar />
      </div>

      {/* Side Bar: Spans the remaining two rows */}
      <div className="row-span-2">
        <SideBar />
      </div>

      {/* Video Player: Fills the main content cell */}
      <div className="h-full w-full">
        <VideoPlayer />
      </div>

      {/* TimeLine: Fills the bottom-right cell */}
      <div className="h-full w-full">
        <TimeLine />
      </div>
    </div>
  );
}
