import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={
          placeholder ||
          "Search..."
        }
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-green-500"
      />
    </div>
  );
}