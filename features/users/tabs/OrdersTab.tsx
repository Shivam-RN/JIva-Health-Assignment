"use client";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import {
  StatusBadge,
  getOrderStatusVariant,
} from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useToast } from "@/components/ui/toaster";
import { ShoppingBag, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { OrderStatus } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";
import { SelectDropdown } from "@/components/shared/SelectDropdown";

interface Props {
  userId: string;
}

export function OrdersTab({ userId }: Props) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const { getOrdersByUserId, updateOrderStatus, deleteOrder } = useOrderStore();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const orders = getOrdersByUserId(userId);

  const handleStatusChange = (orderId: string, value: OrderStatus) => {
    updateOrderStatus(orderId, value);

    toast(`Status updated to ${value}`);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Order History
      </h3>
      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="This user has no orders."
          icon={<ShoppingBag className="w-6 h-6 text-gray-400" />}
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap lg:flex-nowrap items-center gap-4 py-4"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {order.title}
                  </span>
                  <StatusBadge variant={getOrderStatusVariant(order.status)}>
                    {order.status}
                  </StatusBadge>
                </div>
                <p className="flex flex-col gap-0.5 text-sm text-gray-500">
                  <span>{order.details}</span>
                  <span>
                    {formatDate(order.date)} •{" "}
                    <span className="font-medium text-black">
                      {formatCurrency(order.amount)}
                    </span>
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
               <div className="min-w-40">
  <SelectDropdown
    label="Select Status"
    value={order.status}
    options={[
      "Delivered",
      "Pending",
      "Cancelled",
    ]}
    open={
      openDropdownId === order.id
    }
    setOpen={(open) =>
      setOpenDropdownId(
        open ? order.id : null
      )
    }
    onSelect={(value) =>
      handleStatusChange(
        order.id,
        value as OrderStatus
      )
    }
  />
</div>

                <Link
                  href={`/users/${userId}/orders/${order.id}`}
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setDeletingId(order.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deletingId}
        title="Delete Order"
        description="Are you sure you want to delete this order? This cannot be undone."
        onConfirm={() => {
          if (deletingId) {
            deleteOrder(deletingId);
            toast("Order deleted");
          }
          setDeletingId(null);
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
