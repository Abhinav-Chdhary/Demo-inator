// src/lib/store.ts
import { create } from "zustand";
import { VideoState } from "@/types/video";

export const useVideoStore = create<VideoState>((set) => ({
  file: null,
  setFile: (file) => set({ file: file }),
  clearFile: () => set({ file: null }),
}));
