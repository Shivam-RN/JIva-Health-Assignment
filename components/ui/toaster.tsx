"use client";
import { useState, useCallback } from "react";
import { CheckCircle2, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastQueue: ((toast: Toast) => void) | null = null;

export function useToast() {
  const toast = useCallback(
    (message: string, type: ToastType = "success") => {
      if (toastQueue) {
        toastQueue({
          id: Math.random().toString(36).slice(2),
          message,
          type,
        });
      }
    },
    []
  );
  return { toast };
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  toastQueue = (t: Toast) => {
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, 3500);
  };

  const remove = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="fixed bottom-6 right-6 z-100 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium min-w-65 animate-in slide-in-from-right-5"
        >
          {t.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="flex-1">{t.message}</span>
          <button onClick={() => remove(t.id)} className="opacity-60 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
