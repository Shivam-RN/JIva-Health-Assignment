"use client";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useState } from "react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && <Sidebar />}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={
                setSidebarOpen
              }
            />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
