"use client";

import Link from "next/link";

import { User } from "@/types";

import { UserAvatar } from "@/components/shared/UserAvatar";

import {
  StatusBadge,
  getUserStatusVariant,
} from "@/components/shared/StatusBadge";

import { useUserStore } from "@/store/userStore";

import { useToast } from "@/components/ui/toaster";

import { Crown, Eye, Pencil, Mail, Phone, Calendar } from "lucide-react";

import { formatShortDate } from "@/lib/utils";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { upgradeUserToPrime } = useUserStore();

  const { toast } = useToast();

  const roleVariant =
    user.role === "Patient"
      ? "patient"
      : user.role === "Nurse"
        ? "nurse"
        : user.role === "Doctor"
          ? "doctor"
          : "support";

  const typeVariant =
    user.type === "Prime User"
      ? "prime"
      : user.type === "Support Staff"
        ? "support"
        : "normal";

  const handleUpgrade = (e: React.MouseEvent) => {
    e.preventDefault();

    upgradeUserToPrime(user.id);

    toast(`${user.name} upgraded to Prime!`);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm lg:flex-nowrap">
      {/* Avatar */}
      <UserAvatar name={user.name} size="lg" />

      {/* User Info */}
      <div className="min-w-0 w-40">
        <p className="truncate text-sm font-semibold text-gray-900">
          {user.name}
        </p>

        <div className="mt-1 flex flex-wrap gap-1">
          <StatusBadge variant={roleVariant as any}>{user.role}</StatusBadge>

          <StatusBadge variant={getUserStatusVariant(user.status)}>
            {user.status}
          </StatusBadge>
        </div>

        <div className="mt-1">
          <StatusBadge variant={typeVariant as any}>{user.type}</StatusBadge>
        </div>
      </div>

      {/* Contact */}
      <div className="min-w-45 flex-1 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Mail className="h-3 w-3 shrink-0" />

          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Phone className="h-3 w-3 shrink-0" />

          <span>{user.phone}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="min-w-35">
        <div className="mb-0.5 flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar className="h-3 w-3" />
          Joined
        </div>

        <p className="text-sm font-medium text-gray-700">
          {formatShortDate(user.joinedDate)}
        </p>

        <p className="mt-0.5 text-xs text-gray-400">
          Last: {formatShortDate(user.lastActive)}
        </p>
      </div>

      {/* Appointments */}
      <div className="min-w-20 text-center">
        <p className="text-xs text-gray-500">Appointments</p>

        <p className="text-2xl font-bold text-green-600">
          {user.appointmentCount}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        {user.type !== "Prime User" && (
          <button
            onClick={handleUpgrade}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-amber-600"
          >
            <Crown className="h-3 w-3" />
            Upgrade to Prime
          </button>
        )}

        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Eye className="h-3 w-3" />
          View
        </Link>

        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>
    </div>
  );
}
