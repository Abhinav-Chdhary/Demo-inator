// src/components/03_compounds/SidebarMenus/Backgrounds.tsx
import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Upload, Loader2 } from "lucide-react";
import TabButton from "@/components/02_molecules/TabButton";
// Helpers
import { solidColors } from "@/components/helpers/constants";

const Backgrounds = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("solid");
  const ffmpegRef = useRef(new FFmpeg());

  // State to manage selected color
  const { file, setFile, backgroundColor, setBackgroundColor, setMetadata, metadata } =
    useVideoStore((state) => state);

  // State to manage processing state
  const isProcessing = metadata.state === "processing";

  // Placeholder for file input change
  const handleFileUpload = (event: any) => {
    console.log("File uploaded:", event.target.files[0]?.name);
  };

  // Function to apply a background color to video
  const applyBackgroundToVideo = async (color: string) => {
    if (!file) return;

    setMetadata({ ...metadata, state: "processing" });
    const ffmpeg = ffmpegRef.current;

    try {
      // Add logging
      ffmpeg.on("log", ({ message }) => {
        console.log("FFmpeg Log:", message);
      });

      // Load FFmpeg (only if not loaded)
      if (!ffmpeg.loaded) {
        console.log("Loading FFmpeg...");
        // We load the core assets from a CDN (unpkg) to avoid large bundle sizes
        // Use UMD build to avoid ESM blob URL resolution issues
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
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
        console.log("FFmpeg loaded.");
      }

      // B. Prepare Data
      // Convert CSS Hex (#FF0000) to FFmpeg color format (0xFF0000)
      const ffmpegColor = color.replace("#", "0x");

      // Get file extension and type
      const fileExtension = file.name.split(".").pop();
      const inputName = `input.${fileExtension}`;
      const outputName = `output.${fileExtension}`;
      const mimeType = file.type;

      // Write the current file to FFmpeg's virtual file system
      await ffmpeg.writeFile(inputName, await fetchFile(file));

      // C. Run FFmpeg Command
      // -vf (Video Filter):
      // pad=iw+20:ih+20:10:10:color=...
      // means: new width = input width + 20, new height = input height + 20,
      // position input at x=10, y=10, fill the rest with color.
      console.log("Starting FFmpeg processing...");
      await ffmpeg.exec([
        "-i",
        inputName,
        "-vf",
        `pad=iw+40:ih+40:20:20:color=${ffmpegColor}`,
        "-c:a",
        "copy", // Copy audio without processing (faster)
        outputName,
      ]);
      console.log("FFmpeg processing complete.");

      // D. Read the result
      const data = (await ffmpeg.readFile(outputName)) as Uint8Array;

      // E. Create new File object
      const newVideoBlob = new Blob([data.buffer as ArrayBuffer], { type: mimeType });
      const newFile = new File([newVideoBlob], `edited_background.${fileExtension}`, {
        type: mimeType,
      });

      // Update Zustand Store (REPLACE the current video)
      setFile(newFile);

      console.log("Video processed successfully!");
    } catch (error) {
      console.error("Error processing video:", error);
    } finally {
      setMetadata({ ...metadata, state: "idle" });
    }
  };

  // Function to handle color selection
  const handleColorClick = (colorHex: string) => {
    setBackgroundColor(colorHex);
    applyBackgroundToVideo(colorHex);
  };

  return (
    <div className="p-4 bg-card rounded-lg h-full overflow-y-auto relative">
      {/* Processing Indicator */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center rounded-lg backdrop-blur-sm">
          <div className="flex flex-col items-center text-white">
            {/* Loader */}
            <Loader2 className="w-8 h-8 animate-spin mb-2" />

            {/* Text */}
            <p className="text-sm font-medium">Processing Video...</p>
          </div>
        </div>
      )}

      {/* Title */}
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
                    ${backgroundColor === color.hex
                      ? "ring-4 ring-blue-600 ring-offset-2"
                      : "hover:shadow-lg"
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => handleColorClick(color.hex)}
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
                  onChange={(e) => handleColorClick(e.target.value)}
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
