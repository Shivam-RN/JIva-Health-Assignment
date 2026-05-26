import { cn, getInitials, getAvatarColor } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeStyles = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export function UserAvatar({ name, size = "md", className }: UserAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold text-white shrink-0",
        getAvatarColor(name),
        sizeStyles[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
