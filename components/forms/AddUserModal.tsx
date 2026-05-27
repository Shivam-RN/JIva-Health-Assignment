"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import {
  addUserSchema,
  AddUserFormValues,
} from "@/lib/schemas";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/toaster";
import { User } from "@/types";
import { SelectDropdown } from "@/components/shared/SelectDropdown";

export function AddUserModal() {
  const { closeAddModal, addUser } = useUserStore();
  const { toast } = useToast();
  const [genderOpen, setGenderOpen] = useState(false);
  const [bloodOpen, setBloodOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema) as Resolver<AddUserFormValues>,
    defaultValues: {
      country: "India",
    },
  });

  const onSubmit = (
    data: AddUserFormValues
  ) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone:
        data.phone ||
        "+91 00000 00000",
      role: "Patient",
      status: "Active",
      type: "Normal User",
      dob: data.dob || "",
      gender: data.gender || "Male",
      bloodGroup: data.bloodGroup || "O+",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      appointmentCount: 0,
      totalOrders: 0,
      totalBookings: 0,
      totalFamilyMembers: 0,
      totalSpent: 0,
      addresses: data.city
        ? [
            {
              id: crypto.randomUUID(),
              type: "Home",
              isDefault: true,
              street: data.areaDetail || "",
              city: data.city || "",
              state: data.state || "",
              pinCode: data.pinCode || "",
              country: data.country,
            },
          ]
        : [],
    };
    addUser(newUser);
    closeAddModal();
    toast(
      `User ${data.name} added successfully!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Add New User
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              Create a new user account
            </p>
          </div>

          <button
            onClick={closeAddModal}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="px-6 pb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                {...register("name")}
                placeholder="John Smith"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />

              {errors.name && (
                <p className="text-xs text-red-500">
                  {
                    errors.name
                      .message
                  }
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="john@email.com"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />

              {errors.email && (
                <p className="text-xs text-red-500">
                  {
                    errors.email
                      .message
                  }
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                {...register("phone")}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>

            {/* DOB */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <input
                {...register("dob")}
                type="date"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>

              <SelectDropdown
                label="Select gender"
                value={
                  watch("gender") ||
                  ""
                }
                options={[
                  "Male",
                  "Female",
                  "Other",
                ]}
                open={genderOpen}
                setOpen={
                  setGenderOpen
                }
                onSelect={(value) =>
                  setValue(
                    "gender",
                    value as any
                  )
                }
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Blood Group
              </label>

              <SelectDropdown
                label="Select blood group"
                value={
                  watch(
                    "bloodGroup"
                  ) || ""
                }
                options={[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ]}
                open={bloodOpen}
                setOpen={setBloodOpen}
                onSelect={(value) =>
                  setValue(
                    "bloodGroup",
                    value as any
                  )
                }
              />
            </div>

            {/* Area Detail */}
            <div className="col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Area Detail
              </label>

              <input
                {...register(
                  "areaDetail"
                )}
                placeholder="House / Flat / Street"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>

            {/* Pin Code */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Pin Code
              </label>

              <input
                {...register(
                  "pinCode"
                )}
                placeholder="400001"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                City
              </label>

              <input
                {...register("city")}
                placeholder="Mumbai"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                State
              </label>

              <SelectDropdown
                label="Select state"
                value={
                  watch("state") || ""
                }
                options={[
                  "Maharashtra",
                  "Delhi",
                  "Karnataka",
                  "Tamil Nadu",
                  "Gujarat",
                  "Rajasthan",
                  "West Bengal",
                  "Telangana",
                  "Kerala",
                ]}
                open={stateOpen}
                setOpen={setStateOpen}
                onSelect={(value) =>
                  setValue(
                    "state",
                    value
                  )
                }
              />
            </div>

            {/* Country */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>

              <input
                {...register(
                  "country"
                )}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeAddModal}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}