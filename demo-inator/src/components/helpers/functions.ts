// Helper function to format time
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === Infinity) return "00:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const parts = [m, s];
  if (h > 0) {
    parts.unshift(h);
  }
  return parts.map((part) => String(part).padStart(2, "0")).join(":");
}
