"use client";

import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  Stethoscope,
  FlaskConical,
  ShoppingBag,
  Ambulance,
  Handshake,
  FileBarChart,
  ShieldCheck,
  Settings,
  ChevronDown,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Organization", icon: Building2 },
  { label: "User Management", icon: Users, active: true },
  { label: "Services", icon: Briefcase, hasChildren: true },
  { label: "Consultation", icon: Stethoscope },
  { label: "Lab test Booking", icon: FlaskConical },
  { label: "Medicine Orders", icon: ShoppingBag },
  { label: "Ambulance booking", icon: Ambulance },
  { label: "Vendor & Partners", icon: Handshake },
  { label: "Report", icon: FileBarChart },
  { label: "User Access", icon: ShieldCheck },
  { label: "Setting", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-[#F0F1F2] px-4">
        <Image
          src="/logo.png"
          alt="Jiva Health"
          width={90}
          height={80}
          priority
          className="h-auto w-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={cn(
                  "flex h-9 w-full items-center gap-2.5 rounded-lg px-3 text-sm transition-colors",
                  item.active
                    ? "bg-[#C7DED7] font-medium text-[#016A4D]"
                    : "text-[#263238] hover:bg-gray-100"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span className="flex-1 truncate text-left">
                  {item.label}
                </span>

                {item.hasChildren && (
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="border-t border-gray-200 px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#016A4D] text-xs font-semibold text-white">
            AD
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-800">
              Admin User
            </p>

            <p className="truncate text-xs text-gray-400">
              admin@healthcare.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}