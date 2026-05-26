"use client";
import { create } from "zustand";
import { FamilyMember } from "@/types";
import { mockFamilyMembers } from "@/data/familyMembers";

interface FamilyStore {
  members: FamilyMember[];
  isAddModalOpen: boolean;
  editingMember: FamilyMember | null;

  getMembersByUserId: (userId: string) => FamilyMember[];
  addMember: (member: FamilyMember) => void;
  updateMember: (id: string, updates: Partial<FamilyMember>) => void;
  deleteMember: (id: string) => void;

  openAddModal: () => void;
  openEditModal: (member: FamilyMember) => void;
  closeModal: () => void;
}

export const useFamilyStore = create<FamilyStore>((set, get) => ({
  members: mockFamilyMembers,
  isAddModalOpen: false,
  editingMember: null,

  getMembersByUserId: (userId) =>
    get().members.filter((m) => m.userId === userId),

  addMember: (member) =>
    set((s) => ({ members: [...s.members, member] })),

  updateMember: (id, updates) =>
    set((s) => ({
      members: s.members.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),

  deleteMember: (id) =>
    set((s) => ({ members: s.members.filter((m) => m.id !== id) })),

  openAddModal: () => set({ isAddModalOpen: true, editingMember: null }),
  openEditModal: (member) =>
    set({ isAddModalOpen: true, editingMember: member }),
  closeModal: () => set({ isAddModalOpen: false, editingMember: null }),
}));
