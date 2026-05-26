"use client";
import Link from "next/link";
import { User } from "@/types";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { StatusBadge, getUserStatusVariant } from "@/components/shared/StatusBadge";
import { Crown, Eye, Pencil, Mail, Phone, Calendar } from "lucide-react";
import { formatShortDate } from "@/lib/utils";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  

  const roleVariant = user.role === "Patient" ? "patient"
    : user.role === "Nurse" ? "nurse"
    : user.role === "Doctor" ? "doctor"
    : "support";

  const typeVariant = user.type === "Prime User" ? "prime"
    : user.type === "Support Staff" ? "support"
    : "normal";

  

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap lg:flex-nowrap items-center gap-4 hover:shadow-sm transition-shadow">
      {/* Avatar */}
      <UserAvatar name={user.name} size="lg" />

      {/* User Info */}
      <div className="min-w-0 w-40">
        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
        <div className="flex flex-wrap gap-1 mt-1">
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
      <div className="flex-1 min-w-45 space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Mail className="w-3 h-3 shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Phone className="w-3 h-3 shrink-0" />
          <span>{user.phone}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="min-w-35">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
          <Calendar className="w-3 h-3" />
          Joined
        </div>
        <p className="text-sm font-medium text-gray-700">
          {formatShortDate(user.joinedDate)}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Last: {formatShortDate(user.lastActive)}
        </p>
      </div>

      {/* Appointments */}
      <div className="text-center min-w-20">
        <p className="text-xs text-gray-500">Appointments</p>
        <p className="text-2xl font-bold text-green-600">{user.appointmentCount}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
        >
          <Crown className="w-3 h-3" />
          Upgrade to Prime
        </button>
        <Link
          href={`/users/${user.id}`}
          className="flex items-center gap-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
        >
          <Eye className="w-3 h-3" />
          View
        </Link>
        <button className="flex items-center gap-1.5 border border-gray-200 text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
          <Pencil className="w-3 h-3" />
          Edit
        </button>
      </div>
    </div>
  );
}
