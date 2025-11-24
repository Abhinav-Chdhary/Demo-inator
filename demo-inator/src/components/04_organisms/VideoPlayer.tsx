// src/components/04_organisms/VideoPlayer.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { FileVideo, Play, Pause, Undo, Redo } from "lucide-react";
// Helpers
import { useVideoStore } from "@/lib/store";
import { formatTime } from "@/components/helpers/functions";
// Components
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export function VideoPlayer() {
  // Zustand
  const { file, backgroundColor } = useVideoStore((state) => state);

  // React state for player
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // State for custom controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Effect to create/revoke object URL
  useEffect(() => {
    if (!file) {
      setVideoSrc(null);
      setIsPlaying(false);
      setDuration(0);
      setCurrentTime(0);
      return;
    }

    // Create a local URL for the file
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);

    // Cleanup: Revoke the object URL when component unmounts or file changes
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // Video Event Handlers
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Rewind to start
    }
  };

  // Control Handlers
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Handlers for shadcn/ui Slider (expects value as number[])
  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = value[0];
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // If no file is selected
  if (!file || !videoSrc) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm">
        <div className="text-center">
          <FileVideo className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-muted-foreground">No video file selected.</p>
        </div>
      </div>
    );
  }

  // Player State (File selected)
  return (
    <div className="flex-1 flex flex-col rounded-xl bg-card text-card-foreground shadow-sm">
      {/* Video Element */}
      <div className="px-8 py-4 flex justify-center flex-1 items-center overflow-hidden" onClick={togglePlayPause}>
        <div
          style={{
            backgroundColor: backgroundColor || 'transparent',
            padding: backgroundColor ? '20px' : '0',
            display: 'inline-block', // Shrink to fit content
            transition: 'background-color 0.2s ease',
          }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            className="max-h-[70vh] max-w-full object-contain"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      </div>

      {/* Custom Controls Container */}
      <div className="z-10 w-full bg-card backdrop-blur-sm rounded-xl">
        {/* Timeline / Seek Bar */}
        <Slider
          value={[currentTime]}
          max={duration}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />

        {/* Bottom Controls */}
        <div className="mt-2 flex items-center justify-between pb-2">
          {/* Center (Play/Time) */}
          <div className="flex flex-1 items-center justify-center gap-3">
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-white" />
              )}
            </Button>
            <span className="font-mono text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Side (Undo/Redo) */}
          <div className="flex items-center gap-1">
            {/* Undo button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Undo className="h-4 w-4" />
            </Button>

            {/* Redo button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
