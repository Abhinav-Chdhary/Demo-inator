// src/components/04_organisms/SideBar.tsx
"use client";
import { useState } from "react";
// Helpers
// import { useVideoStore } from "@/lib/store";
// Components
import {
  Shapes,
  Image,
  Wand2,
  PanelLeftClose, // Icon for collapse
  PanelLeftOpen,
  MessageSquare,
} from "lucide-react";
import Backgrounds from "../03_compounds/SidebarMenus/Backgrounds";

// Define the navigation items in an array for easy mapping
const navItems = [
  {
    label: "Background",
    icon: Image,
  },
  {
    label: "Elements",
    icon: Shapes,
  },
  {
    label: "Effects",
    icon: Wand2,
  },
];

export function SideBar() {
  // State to manage toggle collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  // State to manage open menu
  const [openMenu, setOpenMenu] = useState<string | null>("Background");

  // Function to handle side bar collapse
  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    setOpenMenu(newCollapsed ? null : "Background");
  };

  return (
    <aside
      className={`
        h-full rounded-xl bg-card text-card-foreground shadow-sm flex
        ${isCollapsed ? "w-18" : "w-md"} 
      `}
    >
      <div
        className={`flex flex-col justify-between
        transition-all duration-300 ease-in-out`}
      >
        {/* Collapse Toggle Button */}
        <div className="p-2">
          <button
            onClick={handleCollapse}
            className={`
            flex items-center w-full h-11 px-4 rounded-lg
            text-sm font-medium 
            hover:bg-accent hover:text-accent-foreground
            transition-colors
          `}
          >
            {/* Icons for a clear expand/collapse action */}
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5 shrink-0" />
            ) : (
              <PanelLeftClose className="h-5 w-5 shrink-0" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-2">
          {/* Iterate over navItems */}
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => setOpenMenu(item.label)}
                  className={`
                  flex items-center w-full h-11 px-4 rounded-lg
                  text-sm font-medium 
                  ${
                    openMenu === item.label
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                  hover:bg-accent hover:text-accent-foreground
                  transition-colors
                `}
                title={item.label}
                >
                  {/* Icon */}
                  <item.icon className="h-5 w-5 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Support Button */}
        <div className="p-2">
          <button
            onClick={() => {}}
            className={`
            flex items-center w-full h-11 px-4 rounded-lg
            text-sm font-medium 
          `}
            title="Support (coming soon)"
            disabled={true}
          >
            <MessageSquare />
          </button>
        </div>
      </div>

      {/* Sidebar menu */}
      {!isCollapsed && (
        <div className="p-2">
          {/* Backgrounds menu */}
          {openMenu === "Background" && <Backgrounds />}
        </div>
      )}
    </aside>
  );
}
