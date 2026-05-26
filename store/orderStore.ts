"use client";

import { create } from "zustand";

import {
  Order,
  OrderStatus,
} from "@/types";

import { mockOrders } from "@/data/orders";

interface OrderStore {
  orders: Order[];

  getOrdersByUserId: (
    userId: string
  ) => Order[];

  getOrderById: (
    orderId: string
  ) => Order | undefined;

  updateOrderStatus: (
    orderId: string,
    status: OrderStatus
  ) => void;

  deleteOrder: (
    orderId: string
  ) => void;
}

export const useOrderStore =
  create<OrderStore>(
    (set, get) => ({
      orders: mockOrders,

      getOrdersByUserId: (
        userId
      ) =>
        get().orders.filter(
          (o) =>
            o.userId.toString() ===
            userId
        ),

      getOrderById: (
        orderId
      ) =>
        get().orders.find(
          (o) =>
            o.id.toString() ===
            orderId
        ),

      updateOrderStatus: (
        orderId,
        status
      ) =>
        set((s) => ({
          orders: s.orders.map(
            (o) =>
              o.id.toString() ===
              orderId
                ? {
                    ...o,
                    status,
                  }
                : o
          ),
        })),

      deleteOrder: (orderId) =>
        set((s) => ({
          orders: s.orders.filter(
            (o) =>
              o.id.toString() !==
              orderId
          ),
        })),
    })
  );