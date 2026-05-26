"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  X,
  ChevronDown,
  Check,
} from "lucide-react";

import {
  addUserSchema,
  AddUserFormValues,
} from "@/lib/schemas";

import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/toaster";

import { User } from "@/types";

export function AddUserModal() {
  const { closeAddModal, addUser } =
    useUserStore();

  const { toast } = useToast();

  const [genderOpen, setGenderOpen] =
    useState(false);

  const [bloodOpen, setBloodOpen] =
    useState(false);

  const [stateOpen, setStateOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),

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

      gender:
        data.gender || "Male",

      bloodGroup:
        data.bloodGroup || "O+",

      joinedDate: new Date()
        .toISOString()
        .split("T")[0],

      lastActive: new Date()
        .toISOString()
        .split("T")[0],

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

              street:
                data.areaDetail || "",

              city: data.city || "",

              state: data.state || "",

              pinCode:
                data.pinCode || "",

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

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setGenderOpen(
                      !genderOpen
                    )
                  }
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700"
                >
                  <span
                    className={
                      watch("gender")
                        ? "text-gray-700"
                        : "text-gray-400"
                    }
                  >
                    {watch(
                      "gender"
                    ) ||
                      "Select gender"}
                  </span>

                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {genderOpen && (
                  <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    {[
                      "Male",
                      "Female",
                      "Other",
                    ].map(
                      (gender) => {
                        const active =
                          watch(
                            "gender"
                          ) ===
                          gender;

                        return (
                          <button
                            key={
                              gender
                            }
                            type="button"
                            onClick={() => {
                              setValue(
                                "gender",
                                gender as any
                              );

                              setGenderOpen(
                                false
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {
                              gender
                            }

                            {active && (
                              <Check className="h-4 w-4" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Blood Group
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setBloodOpen(
                      !bloodOpen
                    )
                  }
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700"
                >
                  <span
                    className={
                      watch(
                        "bloodGroup"
                      )
                        ? "text-gray-700"
                        : "text-gray-400"
                    }
                  >
                    {watch(
                      "bloodGroup"
                    ) ||
                      "Select blood group"}
                  </span>

                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {bloodOpen && (
                  <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    {[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ].map(
                      (group) => {
                        const active =
                          watch(
                            "bloodGroup"
                          ) ===
                          group;

                        return (
                          <button
                            key={
                              group
                            }
                            type="button"
                            onClick={() => {
                              setValue(
                                "bloodGroup",
                                group as any
                              );

                              setBloodOpen(
                                false
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {
                              group
                            }

                            {active && (
                              <Check className="h-4 w-4" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
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

              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setStateOpen(
                      !stateOpen
                    )
                  }
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700"
                >
                  <span
                    className={
                      watch("state")
                        ? "text-gray-700"
                        : "text-gray-400"
                    }
                  >
                    {watch(
                      "state"
                    ) ||
                      "Select state"}
                  </span>

                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>

                {stateOpen && (
                  <div className="absolute top-11 z-50 w-full rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    {[
                      "Maharashtra",
                      "Delhi",
                      "Karnataka",
                      "Tamil Nadu",
                      "Gujarat",
                      "Rajasthan",
                      "West Bengal",
                      "Telangana",
                      "Kerala",
                    ].map(
                      (state) => {
                        const active =
                          watch(
                            "state"
                          ) ===
                          state;

                        return (
                          <button
                            key={
                              state
                            }
                            type="button"
                            onClick={() => {
                              setValue(
                                "state",
                                state
                              );

                              setStateOpen(
                                false
                              );
                            }}
                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              active
                                ? "bg-gray-100 text-black"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {
                              state
                            }

                            {active && (
                              <Check className="h-4 w-4" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
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