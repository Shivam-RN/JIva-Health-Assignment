"use client";

import {
  ChevronDown,
  Check,
} from "lucide-react";

interface SelectDropdownProps {
  label: string;
  value: string;
  options: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onSelect: (value: string) => void;
}

export function SelectDropdown({
  label,
  value,
  options,
  open,
  setOpen,
  onSelect,
}: SelectDropdownProps) {
  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700"
      >
        <span
          className={
            value ? "text-gray-900" : "text-gray-600"
            
          }
        >
          {value || label}
        </span>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
          {options.map((option) => {
            const active =
              value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSelect(option);

                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  active
                    ? "bg-gray-200 text-black"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {option}

                {active && (
                  <Check className="h-4 w-4" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}