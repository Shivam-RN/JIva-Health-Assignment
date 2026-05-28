"use client";

import {
  Search,
  Moon,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
interface TopbarProps {
  sidebarOpen: boolean;

  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-black transition-colors hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Search */}
      <div className="mx-4 flex-1 md:mx-8 md:max-w-xl">
        <div className="relative w-full max-w-97">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B9295]" />

          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-full rounded-md border border-[#8B9295] bg-white py-2 pl-9 pr-3 text-sm text-black outline-none transition-colors focus:border-[#016A4D]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1 md:gap-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100">
          <Moon className="h-4 w-4" />
        </button>

        <button className="relative flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100">
          <Bell className="h-4 w-4" />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            1
          </span>
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#016A4D] text-[10px] font-semibold text-white">
            AD
          </div>
        </div>
      </div>
    </header>
  );
}
