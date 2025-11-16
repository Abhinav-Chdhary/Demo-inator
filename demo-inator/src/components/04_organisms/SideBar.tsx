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
  // State to toggle collapse
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-full rounded-xl bg-card text-card-foreground shadow-sm 
        flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-18" : "w-md"} 
      `}
    >
      {/* Collapse Toggle Button */}
      <div className="p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
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
                className={`
                  flex items-center w-full h-11 px-4 rounded-lg
                  text-sm font-medium 
                  hover:bg-accent hover:text-accent-foreground
                  transition-colors
                `}
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
            hover:bg-accent hover:text-accent-foreground
            transition-colors
          `}
          disabled={true}
        >
          <MessageSquare />
        </button>
      </div>
    </aside>
  );
}
