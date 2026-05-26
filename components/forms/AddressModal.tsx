"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/toaster";
import { Address, User } from "@/types";
import { X } from "lucide-react";

const schema = z.object({
  type: z.enum(["Home", "Work", "Other"]),
  isDefault: z.boolean(),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pinCode: z.string().min(1, "Pin code is required"),
  country: z.string().default("India"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  user: User;
  editingAddress?: Address | null;
  onClose: () => void;
}

export function AddressModal({ user, editingAddress, onClose }: Props) {
  const { updateUser } = useUserStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: editingAddress
      ? {
          type: editingAddress.type,
          isDefault: editingAddress.isDefault,
          street: editingAddress.street,
          city: editingAddress.city,
          state: editingAddress.state,
          pinCode: editingAddress.pinCode,
          country: editingAddress.country,
        }
      : {
          type: "Home",
          isDefault: false,
          country: "India",
        },
  });

  const onSubmit = (data: FormValues) => {
    if (editingAddress) {
      const updatedAddresses = user.addresses.map((a) =>
        a.id === editingAddress.id ? { ...a, ...data } : a
      );
      updateUser(user.id, { addresses: updatedAddresses });
      toast("Address updated!");
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...data,
      };
      // If new address is default, unset others
      const addresses = data.isDefault
        ? user.addresses.map((a) => ({ ...a, isDefault: false }))
        : [...user.addresses];
      updateUser(user.id, { addresses: [...addresses, newAddress] });
      toast("Address added!");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {editingAddress ? "Update address details" : "Add a new address for this user"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Address Type</label>
              <select
                {...register("type")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 transition-colors"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Default */}
            <div className="space-y-1 flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register("isDefault")}
                  type="checkbox"
                  className="w-4 h-4 accent-green-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Set as default</span>
              </label>
            </div>

            {/* Street */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register("street")}
                placeholder="Flat/House No., Building Name, Street"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
              {errors.street && (
                <p className="text-xs text-red-500">{errors.street.message}</p>
              )}
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <input
                {...register("city")}
                placeholder="Mumbai"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
              {errors.city && (
                <p className="text-xs text-red-500">{errors.city.message}</p>
              )}
            </div>

            {/* Pin Code */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                {...register("pinCode")}
                placeholder="400001"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
              {errors.pinCode && (
                <p className="text-xs text-red-500">{errors.pinCode.message}</p>
              )}
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                State <span className="text-red-500">*</span>
              </label>
              <select
                {...register("state")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 transition-colors"
              >
                <option value="">Select state</option>
                {[
                  "Maharashtra","Delhi","Karnataka","Tamil Nadu","Gujarat",
                  "Rajasthan","West Bengal","Telangana","Kerala","Punjab",
                  "Haryana","Uttar Pradesh","Madhya Pradesh","Bihar","Odisha",
                ].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-xs text-red-500">{errors.state.message}</p>
              )}
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Country</label>
              <input
                {...register("country")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              {editingAddress ? "Save Changes" : "Add Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
