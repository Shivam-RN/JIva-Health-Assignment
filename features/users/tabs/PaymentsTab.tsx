"use client";
import { usePaymentStore } from "@/store/paymentStore";
import { StatusBadge, getPaymentStatusVariant } from "@/components/shared/StatusBadge";
import { CreditCard } from "lucide-react";
import { formatDate, formatCurrency } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";

interface Props { userId: string; }

export function PaymentsTab({ userId }: Props) {
  const { getPaymentsByUserId } = usePaymentStore();
  const payments = getPaymentsByUserId(userId);

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Payment History</h3>
      {payments.length === 0 ? (
        <EmptyState
          title="No payments yet"
          description="This user has no payment history."
          icon={<CreditCard className="w-6 h-6 text-gray-400" />}
        />
      ) : (
        <div className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <div key={payment.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 py-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-green-600" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{payment.title}</span>
                  <StatusBadge variant={getPaymentStatusVariant(payment.status)}>
                    {payment.status}
                  </StatusBadge>
                </div>
                <p className="text-sm text-gray-500">
                  {payment.details}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">
                  <span className="font-medium text-gray-500">Txn ID:</span> {payment.id}
                  &nbsp;·&nbsp;{formatDate(payment.date)}
                </p>
              </div>

              {/* Right side */}
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(payment.amount)}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                  {payment.method}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
