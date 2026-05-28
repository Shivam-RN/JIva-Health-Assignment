"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { UserCard } from "@/components/cards/UserCard";
import { AddUserModal } from "@/components/forms/AddUserModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { SelectDropdown } from "@/components/shared/SelectDropdown";
import { SearchInput } from "@/components/shared/ShareInput";

export function UserManagementPage() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const {
    filters,
    setFilters,
    openAddModal,
    isAddModalOpen,
  } = useUserStore();

  const allUsers = useUserStore(
    (s) => s.users
  );

  // Filter Logic
  const filtered = allUsers.filter(
    (user) => {
      const search =
        filters.search.toLowerCase();

      const matchesSearch =
        user.name
          .toLowerCase()
          .includes(search) ||
        user.email
          .toLowerCase()
          .includes(search) ||
        user.phone
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        !filters.status ||
        user.status === filters.status;

      const matchesRole =
        !filters.role ||
        user.role === filters.role;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRole
      );
    }
  );

  // Stats
  const totalUsers = allUsers.length;

  const primeUsers = allUsers.filter(
    (u) => u.type === "Prime User"
  ).length;

  const nonPrimeUsers =
    allUsers.filter(
      (u) => u.type !== "Prime User"
    ).length;

  const totalFamily =
    allUsers.reduce(
      (sum, u) =>
        sum + u.totalFamilyMembers,
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
            Manage user accounts and
            permissions
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
            label:
              "Total Family Members",
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
        <SearchInput
          value={filters.search}
          onChange={(value) =>
            setFilters({
              search: value,
            })
          }
          placeholder="Search by name, email, or phone..."
        />

        {/* Status Filter */}
        <div className="min-w-40">
          <SelectDropdown
            label="All Status"
            value={filters.status}
            options={[
              "All Status",
              "Active",
              "Inactive",
            ]}
            open={statusOpen}
            setOpen={setStatusOpen}
            onSelect={(value) =>
              setFilters({
                status:
                  value ===
                  "All Status"
                    ? ""
                    : (value as any),
              })
            }
          />
        </div>

        {/* Role Filter */}
        <div className="min-w-40">
          <SelectDropdown
            label="All Roles"
            value={filters.role}
            options={[
              "All Roles",
              "Patient",
              "Nurse",
              "Doctor",
            ]}
            open={roleOpen}
            setOpen={setRoleOpen}
            onSelect={(value) =>
              setFilters({
                role:
                  value ===
                  "All Roles"
                    ? ""
                    : value,
              })
            }
          />
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
      {isAddModalOpen && (
        <AddUserModal />
      )}
    </div>
  );
}