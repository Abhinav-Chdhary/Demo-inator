// src/types/video.d.ts

// Video slice type
export interface VideoState {
  file: File | null;
  setFile: (file: File) => void;
  clearFile: () => void;
  backgroundColor: string | null;
  setBackgroundColor: (color: string) => void;
  metadata: {
    state: "idle" | "processing" | "success" | "error";
    progress: number;
    error: string | null;
  };
  setMetadata: (metadata: {
    state: "idle" | "processing" | "success" | "error";
    progress: number;
    error: string | null;
  }) => void;
}
