"use client";
import Link from "next/link";
import { useOrderStore } from "@/store/orderStore";
import { StatusBadge, getOrderStatusVariant } from "@/components/shared/StatusBadge";
import { ArrowLeft, CheckCircle2, Circle, Package, MapPin, CreditCard, Clock } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";

interface Props { userId: string; orderId: string; }

export function OrderDetailPage({ userId, orderId }: Props) {
  const { getOrderById } = useOrderStore();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Order not found.</p>
        <Link href={`/users/${userId}`} className="text-green-600 text-sm mt-2 inline-block hover:underline">
          Back to User Detail
        </Link>
      </div>
    );
  }

  const total = order.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Link
        href={`/users/${userId}`}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to User Detail
      </Link>

      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{order.title}</h1>
          <p className="text-sm text-gray-400 mt-0.5">Placed on {formatDate(order.date)}</p>
        </div>
        <StatusBadge variant={getOrderStatusVariant(order.status)} className="text-sm px-3 py-1">
          {order.status}
        </StatusBadge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Order Info */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Order Information</h2>
          </div>
          <div className="space-y-0">
            {[
              { label: "Order ID", value: order.id },
              { label: "Order Date", value: formatDate(order.date) },
              { label: "Payment Method", value: order.paymentMethod },
              { label: "Payment Status", value: order.paymentStatus },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2.5 text-sm">
              <span className="text-gray-500">Order Status</span>
              <StatusBadge variant={getOrderStatusVariant(order.status)}>{order.status}</StatusBadge>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Shipping Address</h2>
          </div>
          <div className="space-y-0">
            {[
              { label: "Street", value: order.shippingAddress.street },
              { label: "City", value: order.shippingAddress.city },
              { label: "State", value: order.shippingAddress.state },
              { label: "Pin Code", value: order.shippingAddress.pinCode },
              { label: "Country", value: order.shippingAddress.country },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-800 text-right max-w-50">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Delivery Timeline</h2>
          </div>
          <div className="space-y-4">
            {order.timeline.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                  )}
                  {idx < order.timeline.length - 1 && (
                    <div className={`w-0.5 h-6 mt-1 ${step.done ? "bg-green-300" : "bg-gray-200"}`} />
                  )}
                </div>
                <div>
                  <p className={`text-sm font-medium ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  {step.date && (
                    <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medicines */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900">Ordered Medicines</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.name}</p>
                  {item.quantity > 0 && item.unit && (
                    <p className="text-xs text-gray-400">{item.quantity} {item.unit}</p>
                  )}
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.price)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200 mt-2">
            <span className="text-sm font-bold text-gray-900">Total Amount</span>
            <span className="text-base font-bold text-gray-900">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
