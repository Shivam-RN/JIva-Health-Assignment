"use client";

import { useUserStore } from "@/store/userStore";
import { UserCard } from "@/components/cards/UserCard";
import { AddUserModal } from "@/components/forms/AddUserModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { Search, Filter, Plus, ChevronDown, Check } from "lucide-react";
import { useState } from "react";

export function UserManagementPage() {
  const [statusOpen, setStatusOpen] =
    useState(false);

  const [roleOpen, setRoleOpen] =
    useState(false);

  const {
    filters,
    setFilters,
    openAddModal,
    isAddModalOpen,
  } = useUserStore();

  const allUsers = useUserStore((s) => s.users);

  // Filter Logic
  const filtered = allUsers.filter((user) => {
    const search = filters.search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.phone.toLowerCase().includes(search);

    const matchesStatus =
      !filters.status || user.status === filters.status;

    const matchesRole =
      !filters.role || user.role === filters.role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  // Stats
  const totalUsers = allUsers.length;

  const primeUsers = allUsers.filter(
    (u) => u.type === "Prime User"
  ).length;

  const nonPrimeUsers = allUsers.filter(
    (u) => u.type !== "Prime User"
  ).length;

  const totalFamily = allUsers.reduce(
    (sum, u) => sum + u.totalFamilyMembers,
    0
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>

          <p className="mt-0.5 text-sm text-gray-500">
            Manage user accounts and permissions
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Total Users",
            value: totalUsers,
          },
          {
            label: "Prime Users",
            value: primeUsers,
          },
          {
            label: "Non-Prime Users",
            value: nonPrimeUsers,
          },
          {
            label: "Total Family Members",
            value: totalFamily,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <p className="mb-1 text-sm text-gray-500">
              {s.label}
            </p>

            <p className="text-2xl font-semibold text-green-600">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            value={filters.search}
            onChange={(e) =>
              setFilters({
                search: e.target.value,
              })
            }
            placeholder="Search by name, email, or phone..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-green-500"
          />
        </div>

        {/* Status Filter */}
        {/* Status Filter */}
<div className="relative w-[184px]">
  <button
    type="button"
    onClick={() =>
      setStatusOpen(!statusOpen)
    }
    className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700"
  >
    <span>
      {filters.status || "All Status"}
    </span>

    <ChevronDown className="h-4 w-4 text-gray-400" />
  </button>

  {statusOpen && (
    <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
      {[
        "All Status",
        "Active",
        "Inactive",
      ].map((status) => {
        const active =
          (filters.status ||
            "All Status") === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => {
              setFilters({
                status:
                  status === "All Status"
                    ? ""
                    : (status as any),
              });

              setStatusOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              active
                ? "bg-gray-100 text-black"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {status}

            {active && (
              <Check className="h-4 w-4" />
            )}
          </button>
        );
      })}
    </div>
  )}
</div>

{/* Role Filter */}
<div className="relative w-[184px]">
  <button
    type="button"
    onClick={() =>
      setRoleOpen(!roleOpen)
    }
    className="flex h-9 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700"
  >
    <span>
      {filters.role || "All Roles"}
    </span>

    <ChevronDown className="h-4 w-4 text-gray-400" />
  </button>

  {roleOpen && (
    <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
      {[
        "All Roles",
        "Patient",
        "Nurse",
        "Doctor",
      ].map((role) => {
        const active =
          (filters.role || "All Roles") ===
          role;

        return (
          <button
            key={role}
            type="button"
            onClick={() => {
              setFilters({
                role:
                  role === "All Roles"
                    ? ""
                    : role,
              });

              setRoleOpen(false);
            }}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              active
                ? "bg-gray-100 text-black"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {role}

            {active && (
              <Check className="h-4 w-4" />
            )}
          </button>
        );
      })}
    </div>
  )}
</div>
      </div>

      {/* User List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No users found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((user) => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isAddModalOpen && <AddUserModal />}
    </div>
  );
}