"use client";
import { create } from "zustand";
import { Payment } from "@/types";
import { mockPayments } from "@/data/payments";

interface PaymentStore {
  payments: Payment[];
  getPaymentsByUserId: (userId: string) => Payment[];
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  payments: mockPayments,
  getPaymentsByUserId: (userId) =>
    get().payments.filter((p) => p.userId === userId),
}));
