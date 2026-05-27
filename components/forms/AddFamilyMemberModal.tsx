"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addFamilyMemberSchema,
  AddFamilyMemberFormValues,
} from "@/lib/schemas";
import { useFamilyStore } from "@/store/familyStore";
import { useToast } from "@/components/ui/toaster";
import { X } from "lucide-react";
import { FamilyMember } from "@/types";
import { SelectDropdown } from "@/components/shared/SelectDropdown";

interface Props {
  userId: string;
}

export function AddFamilyMemberModal({ userId }: Props) {
  const { closeModal, addMember, editingMember, updateMember } = useFamilyStore();
  const { toast } = useToast();
  const [relationshipOpen, setRelationshipOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false)
  const [bloodOpen, setBloodOpen] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddFamilyMemberFormValues>({resolver: zodResolver(addFamilyMemberSchema),

    defaultValues: editingMember
      ? {
          name: editingMember.name,
          relationship: editingMember.relationship,
          phone: editingMember.phone,
          dob: editingMember.dob,
          gender: editingMember.gender,
          bloodGroup: editingMember.bloodGroup,
        }
      : {},
  });

  const onSubmit = (data: AddFamilyMemberFormValues) => {
    if (editingMember) {
      updateMember(editingMember.id, {
        ...data,
      });

      toast("Family member updated!");
    } else {
      const member: FamilyMember = {
        id: Date.now().toString(),
        userId,
        name: data.name,
        relationship: data.relationship,
        phone: data.phone || "",
        dob: data.dob || "",
        gender: data.gender || "Male",
        bloodGroup: data.bloodGroup || "O+",
      };
      addMember(member);
      toast("Family member added!");
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              {editingMember ? "Edit Family Member" : "Add Family Member"}
            </h2>

            <p className="mt-0.5 text-sm text-gray-500">
              {editingMember
                ? "Update family member details"
                : "Add a new family member"}
            </p>
          </div>

          <button
            onClick={closeModal}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>

              <input
                {...register("name")}
                placeholder="Full name"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500"
              />

              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Relationship */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Relationship
              </label>

              <SelectDropdown
                label="Select relationship"
                value={watch("relationship") || ""}
                options={[
                  "Son",
                  "Daughter",
                  "Spouse",
                  "Father",
                  "Mother",
                  "Sibling",
                  "Other",
                ]}
                open={relationshipOpen}
                setOpen={setRelationshipOpen}
                onSelect={(value) => setValue("relationship", value as any)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>

              <input
                {...register("phone")}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500"
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
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-green-500"
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>

              <SelectDropdown
                label="Select gender"
                value={watch("gender") || ""}
                options={["Male", "Female", "Other"]}
                open={genderOpen}
                setOpen={setGenderOpen}
                onSelect={(value) => setValue("gender", value as any)}
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Blood Group
              </label>

              <SelectDropdown
                label="Select blood group"
                value={watch("bloodGroup") || ""}
                options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
                open={bloodOpen}
                setOpen={setBloodOpen}
                onSelect={(value) => setValue("bloodGroup", value as any)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              {editingMember ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
