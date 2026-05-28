"use client";

import { create } from "zustand";

import { User, UserStatus } from "@/types";
import { mockUsers } from "@/data/user";

interface UserFilters {
  search: string;
  status: UserStatus | "";
  role: string;
}

interface UserStore {
  users: User[];
  filters: UserFilters;
  selectedUserId: string | null;
  isAddModalOpen: boolean;

  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (
    id: string,
    updates: Partial<User>
  ) => void;

  deleteUser: (id: string) => void;

  upgradeUserToPrime: (id: string) => void;
  setFilters: (
    filters: Partial<UserFilters>
  ) => void;

  resetFilters: () => void;

  setSelectedUserId: (
    id: string | null
  ) => void;

  getSelectedUser: () => User | undefined;

  openAddModal: () => void;
  closeAddModal: () => void;
}

const defaultFilters: UserFilters = {
  search: "",
  status: "",
  role: "",
};

export const useUserStore =
  create<UserStore>()((set, get) => ({
    users: mockUsers,

    filters: defaultFilters,

    selectedUserId: null,

    isAddModalOpen: false,

    // Users
    setUsers: (users) =>
      set({
        users,
      }),

    addUser: (user) =>
      set((state) => ({
        users: [...state.users, user],
      })),

    updateUser: (id, updates) =>
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id
            ? {
                ...user,
                ...updates,
              }
            : user
        ),
      })),

    deleteUser: (id) =>
      set((state) => ({
        users: state.users.filter(
          (user) => user.id !== id
        ),
      })),

    upgradeUserToPrime: (id: string) =>
  set((state) => ({
    users: state.users.map((user) =>
      user.id === id
        ? {
            ...user,
            type: "Prime User",
          }
        : user
    ),
  })),

    // Filters
    setFilters: (filters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })),

    resetFilters: () =>
      set({
        filters: defaultFilters,
      }),

    // Selected User
    setSelectedUserId: (id) =>
      set({
        selectedUserId: id,
      }),

    getSelectedUser: () => {
      const {
        users,
        selectedUserId,
      } = get();

      return users.find(
        (user) =>
          user.id === selectedUserId
      );
    },

    // Modal
    openAddModal: () =>
      set({
        isAddModalOpen: true,
      }),

    closeAddModal: () =>
      set({
        isAddModalOpen: false,
      }),
  }));