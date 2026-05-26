"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/toaster";
import { User } from "@/types";
import { X } from "lucide-react";

const schema = z.object({
  email: z.string().email("Valid email required"),
  phone: z.string().min(1, "Phone is required"),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  user: User;
  onClose: () => void;
}

export function EditPersonalInfoModal({ user, onClose }: Props) {
  const { updateUser } = useUserStore();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      gender: user.gender,
      bloodGroup: user.bloodGroup,
    },
  });

  const onSubmit = (data: FormValues) => {
    updateUser(user.id, {
      email: data.email,
      phone: data.phone,
      dob: data.dob || user.dob,
      gender: data.gender,
      bloodGroup: data.bloodGroup,
    });
    toast("Personal information updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Edit Personal Information</h2>
            <p className="text-sm text-gray-500 mt-0.5">Update profile details for {user.name}</p>
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
            {/* Email */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
              {errors.phone && (
                <p className="text-xs text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* DOB */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                {...register("dob")}
                type="date"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 transition-colors"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-xs text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* Blood Group */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Blood Group <span className="text-red-500">*</span>
              </label>
              <select
                {...register("bloodGroup")}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-green-500 bg-gray-50 transition-colors"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-xs text-red-500">{errors.bloodGroup.message}</p>
              )}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
