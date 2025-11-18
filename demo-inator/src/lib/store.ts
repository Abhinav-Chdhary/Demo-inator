// src/lib/store.ts
import { create } from "zustand";
import { VideoState } from "@/types/video";

export const useVideoStore = create<VideoState>((set) => ({
  // File related
  file: null,
  setFile: (file) => set({ file: file }),
  clearFile: () => set({ file: null }),
  // Background related
  backgroundColor: null,
  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
  // Metadata related
  metadata: {
    state: "idle",
    progress: 0,
    error: null,
  },
  setMetadata: (metadata) => set({ metadata: metadata }),
}));
