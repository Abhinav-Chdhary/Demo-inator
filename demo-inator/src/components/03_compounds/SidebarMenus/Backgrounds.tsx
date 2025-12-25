// src/components/03_compounds/SidebarMenus/Backgrounds.tsx
import { useState, useRef } from "react";

// Helpers
import { useVideoStore } from "@/lib/store";
// Components
import { Upload, Loader2 } from "lucide-react";
import TabButton from "@/components/02_molecules/TabButton";
// Helpers
import { solidColors } from "@/components/helpers/constants";
// BARK

const Backgrounds = () => {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState("solid");

  // State to manage selected color
  const { file, setFile, backgroundColor, setBackgroundColor, setMetadata, metadata } =
    useVideoStore((state) => state);

  // State to manage processing state
  const isProcessing = metadata.state === "processing";

  // Placeholder for file input change
  const handleFileUpload = (event: any) => {
    console.log("File uploaded:", event.target.files[0]?.name);
  };

  // Function to handle color selection
  const handleColorClick = (colorHex: string) => {
    setBackgroundColor(colorHex);
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
