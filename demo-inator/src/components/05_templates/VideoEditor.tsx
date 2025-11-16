// src/components/05_templates/VideoEditor.tsx
"use client";
// Components
import { TopBar } from "../04_organisms/TopBar";
import { VideoPlayer } from "../04_organisms/VideoPlayer";
import { TimeLine } from "../04_organisms/TimeLine";
import { SideBar } from "../04_organisms/SideBar";

export function VideoEditor() {
  return (
    <div className="flex flex-col gap-2 h-screen">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex gap-2">
        {/* Side Bar */}
        <SideBar />

        {/* Video Player and TimeLine */}
        <div className="flex flex-col gap-2 w-full">
          <VideoPlayer />

          {/* TimeLine */}
          <TimeLine />
        </div>
      </div>
    </div>
  );
}
