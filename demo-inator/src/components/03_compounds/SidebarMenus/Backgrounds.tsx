// src/components/03_compounds/SidebarMenus/Backgrounds.tsx
import { useState } from "react";
// Components
import { Upload } from "lucide-react";

// Define the initial list of attractive, video-friendly background colors
const solidColors = [
  { name: "Smoke Gray", hex: "#E5E7EB" },
  { name: "Warm Beige", hex: "#F3F4F6" },
  { name: "Misty Blue", hex: "#CFE2F3" },
  { name: "Sage Green", hex: "#D7E7D9" },
  { name: "Navy Dusk", hex: "#1F2937" },
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
  const [activeTab, setActiveTab] = useState("solid"); // 'solid' or 'images'
  const [selectedColor, setSelectedColor] = useState(solidColors[0].hex);

  // Placeholder for file input change
  const handleFileUpload = (event: any) => {
    console.log("File uploaded:", event.target.files[0]?.name);
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

      {/* Tab Content */}
      <div className="py-2">
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
                      selectedColor === color.hex
                        ? "ring-4 ring-blue-600 ring-offset-2"
                        : "hover:shadow-lg"
                    }
                  `}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.hex)}
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
                style={{
                  backgroundColor: selectedColor ? selectedColor : "#E5E7EB",
                }}
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
                  onChange={(e) => setSelectedColor(e.target.value)}
                  
                />
              </label>
            </div>

            {/* Display selected color (optional feedback) */}
            <div className="mt-4 text-sm font-medium">
              Current Color:{" "}
              <span className="font-mono text-white-foreground">
                {selectedColor}
              </span>
            </div>
          </div>
        )}

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
