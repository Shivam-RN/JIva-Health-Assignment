import { cn } from "@/lib/utils";
import { OrderStatus, PaymentStatus, UserStatus } from "@/types";

type BadgeVariant =
  | "active"
  | "inactive"
  | "patient"
  | "nurse"
  | "doctor"
  | "normal"
  | "prime"
  | "support"
  | "delivered"
  | "pending"
  | "cancelled"
  | "completed"
  | "failed"
  | "son" | "daughter" | "spouse" | "father" | "mother" | "sibling" | "other"
  | "home" | "work"
  | "default"
  | "gray"
  | "blood";

const variantStyles: Record<BadgeVariant, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-red-100 text-red-600",
  patient: "bg-sky-50 text-sky-700",
  nurse: "bg-purple-50 text-purple-700",
  doctor: "bg-indigo-50 text-indigo-700",
  normal: "bg-slate-100 text-slate-600",
  prime: "bg-amber-100 text-amber-700",
  support: "bg-slate-100 text-slate-600",
  delivered: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-600",
  son: "bg-green-50 text-green-700",
  daughter: "bg-pink-50 text-pink-700",
  spouse: "bg-blue-50 text-blue-700",
  father: "bg-indigo-50 text-indigo-700",
  mother: "bg-rose-50 text-rose-700",
  sibling: "bg-violet-50 text-violet-700",
  other: "bg-gray-100 text-gray-600",
  home: "bg-green-50 text-green-700",
  work: "bg-blue-50 text-blue-700",
  default: "bg-green-100 text-green-700",
  gray: "bg-gray-100 text-gray-600",
  blood: "bg-red-50 text-red-700",
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant] ?? variantStyles.gray,
        className
      )}
    >
      {children}
    </span>
  );
}

export function getUserStatusVariant(status: UserStatus): BadgeVariant {
  return status === "Active" ? "active" : "inactive";
}

export function getOrderStatusVariant(status: OrderStatus): BadgeVariant {
  const map: Record<OrderStatus, BadgeVariant> = {
    Delivered: "delivered",
    Pending: "pending",
    Cancelled: "cancelled",
  };
  return map[status];
}

export function getPaymentStatusVariant(status: PaymentStatus): BadgeVariant {
  const map: Record<PaymentStatus, BadgeVariant> = {
    Completed: "completed",
    Pending: "pending",
    Failed: "failed",
  };
  return map[status];
}
