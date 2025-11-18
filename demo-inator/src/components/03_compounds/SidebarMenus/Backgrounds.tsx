// src/components/03_compounds/SidebarMenus/Backgrounds.tsx
import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the initial list of attractive, video-friendly background colors
const solidColors = [
  { name: "Smoke Gray", hex: "#D1D5DB" },
  { name: "Warm Beige", hex: "#E5DED7" },
  { name: "Misty Blue", hex: "#B4CFE6" },
  { name: "Sage Green", hex: "#BFD8CC" },
  { name: "Navy Dusk", hex: "#111850" },
];

// Reusable Tab Button component
const TabButton = ({ isActive, label, onClick }: any) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-2 text-sm font-semibold rounded-t-lg transition-colors duration-200
      ${isActive ? "bg-blue-600 shadow-inner" : ""}
    `}
  >
    {label}
  </button>
);

const Backgrounds = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("solid");

  // State to manage selected color
  const { file, setFile, backgroundColor, setBackgroundColor, setMetadata } =
    useVideoStore((state) => state);

  // Placeholder for file input change
  const handleFileUpload = (event: any) => {
    console.log("File uploaded:", event.target.files[0]?.name);
  };

  // Function to apply a background color to video
  const applyBackgroundToVideo = async () => {
    if (!file) return;

    setMetadata({state: "processing"});
    const ffmpeg = ffmpegRef.current;

    try {
      // A. Load FFmpeg (only if not loaded)
      if (!ffmpeg.loaded) {
        // We load the core assets from a CDN (unpkg) to avoid large bundle sizes
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm"
          ),
        });
      }

      // B. Prepare Data
      // Convert CSS Hex (#FF0000) to FFmpeg color format (0xFF0000)
      const ffmpegColor = backgroundColor.replace("#", "0x");

      // Write the current file to FFmpeg's virtual file system
      const inputName = "input.mp4";
      const outputName = "output.mp4";
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      // C. Run FFmpeg Command
      // -vf (Video Filter):
      // pad=iw+20:ih+20:10:10:color=...
      // means: new width = input width + 20, new height = input height + 20,
      // position input at x=10, y=10, fill the rest with color.
      await ffmpeg.exec([
        "-i",
        inputName,
        "-vf",
        `pad=iw+20:ih+20:10:10:color=${ffmpegColor}`,
        "-c:a",
        "copy", // Copy audio without processing (faster)
        outputName,
      ]);

      // D. Read the result
      const data = (await ffmpeg.readFile(outputName)) as Uint8Array;

      // E. Create new File object
      const newVideoBlob = new Blob([data.buffer], { type: "video/mp4" });
      const newFile = new File([newVideoBlob], "edited_background.mp4", {
        type: "video/mp4",
      });

      // F. Update Zustand Store (REPLACE the current video)
      setFile(newFile);

      console.log("Video processed successfully!");
    } catch (error) {
      console.error("Error processing video:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg h-full overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 border-b pb-2">Background</h3>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        {/* Solid colors tab */}
        <TabButton
          label="Solid Colors"
          isActive={activeTab === "solid"}
          onClick={() => setActiveTab("solid")}
        />

        {/* Images tab */}
        <TabButton
          label="Images"
          isActive={activeTab === "images"}
          onClick={() => setActiveTab("images")}
        />
      </div>

      {/* Tab content */}
      <div className="py-2">
        {/* Colors tab */}
        {activeTab === "solid" && (
          <div className="space-y-4">
            <p className="text-sm text-white-foreground">
              Choose a solid color background for your video
            </p>

            {/* Color Swatches Grid */}
            <div className="grid grid-cols-3 gap-3">
              {solidColors.map((color) => (
                <div
                  key={color.hex}
                  className={`
                    w-full aspect-square rounded-lg shadow-md cursor-pointer 
                    transition-all duration-150 ease-in-out relative
                    ${
                      backgroundColor === color.hex
                        ? "ring-4 ring-blue-600 ring-offset-2"
                        : "hover:shadow-lg"
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setBackgroundColor(color.hex)}
                  title={color.name}
                ></div>
              ))}

              {/* Custom Color Picker Option */}
              <label
                className={`
                  w-full aspect-square rounded-lg shadow-md cursor-pointer 
                  flex flex-col items-center justify-center 
                  border-2 border-dashed border-gray-300 hover:border-blue-600
                  transition-all duration-150 ease-in-out
                `}
                title="Choose a custom color"
              >
                <div className="text-center text-xs font-medium text-white-foreground">
                  <span className="block mb-1 text-lg">🎨</span>
                  Custom
                </div>

                {/* Hidden input for color selection */}
                <input
                  type="color"
                  className="w-0 h-0 opacity-0 absolute"
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
            </div>

            {/* Display selected color */}
            <div className="mt-4 text-sm font-medium flex items-center">
              Current Color:
              {backgroundColor && (
                <div
                  className="w-4 h-4 rounded-full inline-block m-2"
                  style={{ backgroundColor: backgroundColor }}
                ></div>
              )}
              {/* Display hex code */}
              <span className="font-mono text-white-foreground">
                {backgroundColor}
              </span>
            </div>
          </div>
        )}

        {/* Images tab */}
        {activeTab === "images" && (
          <div className="space-y-4">
            <p className="text-sm text-white-foreground">
              Upload an image to use as your video background.
            </p>

            <label
              htmlFor="image-upload"
              className="
                flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 
                rounded-lg cursor-pointer hover:bg-gray-50 transition-colors
              "
            >
              <Upload className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-blue-600">
                Click to upload image
              </p>
              <p className="text-xs text-white-foreground mt-1">
                PNG, JPG, JPEG up to 5MB
              </p>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Backgrounds;
