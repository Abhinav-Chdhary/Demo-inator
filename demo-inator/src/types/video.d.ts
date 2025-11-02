// src/types/video.d.ts

// Video slice type
export interface VideoState {
  file: File | null;
  setFile: (file: File) => void;
  clearFile: () => void;
}
