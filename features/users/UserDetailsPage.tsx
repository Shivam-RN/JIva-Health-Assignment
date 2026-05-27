"use client";
import Link from "next/link";
import { useUserStore } from "@/store/userStore";
import { UserAvatar } from "@/components/shared/UserAvatar";
import {
  StatusBadge,
  getUserStatusVariant,
} from "@/components/shared/StatusBadge";

import { useToast } from "@/components/ui/toaster";
import {
  ArrowLeft,
  Crown,
  ShoppingBag,
  CalendarCheck,
  Users,
  CreditCard,
  User,
  ShoppingCart,
  Wallet,
  UserCheck,
} from "lucide-react";
import { useState } from "react";
import { formatShortDate, formatCurrency } from "@/lib/utils";
import { UserStatus } from "@/types";
import { useFamilyStore } from "@/store/familyStore";
import { OverviewTab } from "./tabs/OverviewTab";
import { OrdersTab } from "./tabs/OrdersTab";
import { SelectDropdown } from "@/components/shared/SelectDropdown";
import { PaymentsTab } from "./tabs/PaymentsTab";
import { FamilyMembersTab } from "./tabs/FamilyMembersTab";

type Tab = "overview" | "orders" | "payments" | "family";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: User },
  { id: "orders", label: "Orders & Bookings", icon: ShoppingCart },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "family", label: "Family Members", icon: Users },
];

interface Props {
  userId: string;
}

export function UserDetailPage({ userId }: Props) {
  const [statusOpen, setStatusOpen] = useState(false);
  const { users, updateUser } = useUserStore();
  const { getMembersByUserId } = useFamilyStore();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const user = users.find((u) => u.id.toString() === userId);
  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">User not found.</p>
        <Link
          href="/users"
          className="text-green-600 text-sm mt-2 inline-block hover:underline"
        >
          Back to User Management
        </Link>
      </div>
    );
  }

  const familyMembers = getMembersByUserId(userId);

  const handleStatusChange = (value: UserStatus) => {
    updateUser(user.id, {
      status: value,
    });

    toast(`Status updated to ${value}`);
  };

  const roleVariant =
    user.role === "Patient"
      ? "patient"
      : user.role === "Nurse"
        ? "nurse"
        : user.role === "Doctor"
          ? "doctor"
          : "support";

  const metrics = [
    {
      label: "Total Orders",
      value: user.totalOrders,
      icon: ShoppingBag,
      iconBg: "bg-blue-50 text-blue-500",
      valueColor: "text-gray-900",
    },
    {
      label: "Total Booking & Appointment",
      value: user.totalBookings,
      icon: CalendarCheck,
      iconBg: "bg-teal-50 text-teal-500",
      valueColor: "text-green-600",
    },
    {
      label: "Total Family Member",
      value: familyMembers.length,
      icon: Users,
      iconBg: "bg-green-50 text-green-600",
      valueColor: "text-gray-900",
    },
    {
      label: "Total Spent",
      value: formatCurrency(user.totalSpent),
      icon: CreditCard,
      iconBg: "bg-green-50 text-green-600",
      valueColor: "text-gray-900",
      isString: true,
    },
  ];

  return (
    <div>
      {/* Back */}
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-700 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to User Management
      </Link>

      {/* Header Card */}
      <div className="p-6 mb-4">
        <div className="flex flex-wrap gap-4 items-start">
          <UserAvatar name={user.name} size="xl" />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {user.name}
            </h1>
            <div className="flex flex-wrap gap-2 mb-2">
              <StatusBadge variant={getUserStatusVariant(user.status)}>
                {user.status}
              </StatusBadge>
              <StatusBadge variant={roleVariant as any}>
                {user.role}
              </StatusBadge>
              <StatusBadge
                variant={user.type === "Prime User" ? "prime" : "normal"}
              >
                {user.type}
              </StatusBadge>
              <span className="text-sm text-gray-400 flex items-center">
                ID: #{user.id}
              </span>
            </div>
            <div className="flex flex-wrap gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5" />
                Joined {formatShortDate(user.joinedDate)}
              </span>
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Last active {formatShortDate(user.lastActive)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              <Crown className="w-4 h-4" />
              Upgrade to Prime
            </button>
            <div className="min-w-40">
              <SelectDropdown
                label="Select Status"
                value={user.status}
                options={["Active", "Inactive"]}
                open={statusOpen}
                setOpen={setStatusOpen}
                onSelect={(value) => handleStatusChange(value as UserStatus)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 mb-1 leading-snug">
                  {m.label}
                </p>
                <p className={`text-2xl font-bold ${m.valueColor}`}>
                  {m.isString ? m.value : m.value}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${m.iconBg}`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-black"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {activeTab === "overview" && <OverviewTab user={user} />}
          {activeTab === "orders" && <OrdersTab userId={userId} />}
          {activeTab === "payments" && <PaymentsTab userId={userId} />}
          {activeTab === "family" && <FamilyMembersTab userId={userId} />}
        </div>
      </div>
    </div>
  );
}
