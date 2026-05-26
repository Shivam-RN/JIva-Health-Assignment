"use client";
import { useState } from "react";
import { User, Address } from "@/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { EditPersonalInfoModal } from "@/components/forms/EditPersonalInfoModal";
import { AddressModal } from "@/components/forms/AddressModal";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useUserStore } from "@/store/userStore";
import { useToast } from "@/components/ui/toaster";
import {  Trash2, Plus, Mail, Phone, Calendar, User as UserIcon, Heart, Home, Briefcase, SquarePen } from "lucide-react";
import { formatShortDate } from "@/lib/utils";

interface Props { user: User; }

export function OverviewTab({ user }: Props) {
  const { updateUser } = useUserStore();
  const { toast } = useToast();

  const [editPersonalOpen, setEditPersonalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteAddress = () => {
    if (!deletingId) return;
    const updated = user.addresses.filter((a) => a.id !== deletingId);
    updateUser(user.id, { addresses: updated });
    setDeletingId(null);
    toast("Address removed");
  };

  const openAddAddress = () => {
    setEditingAddress(null);
    setAddressModalOpen(true);
  };

  const openEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setAddressModalOpen(true);
  };

  const personalFields = [
    { label: "Email", value: user.email, icon: Mail },
    { label: "Phone", value: user.phone, icon: Phone },
    { label: "Date of Birth", value: formatShortDate(user.dob), icon: Calendar },
    { label: "Gender", value: user.gender, icon: UserIcon },
    { label: "Blood Group", value: user.bloodGroup, icon: Heart },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Personal Info */}
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Personal Information</h3>
          <button
            onClick={() => setEditPersonalOpen(true)}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <SquarePen className="w-3 h-3" /> Edit
          </button>
        </div>
        <div className="space-y-0">
          {personalFields.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <div className="w-7 h-7 rounded-lg  flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-black" />
              </div>
              <span className="text-sm text-green-700 w-28 shrink-0">{label}:</span>
              <span className="text-sm font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Addresses */}
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Addresses</h3>
          <button
            onClick={openAddAddress}
            className="flex items-center gap-1.5 border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
       <div className="max-h-100 space-y-3 overflow-y-auto pr-1">
          {user.addresses.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6">No addresses added yet</p>
          )}
          {user.addresses.map((addr) => {
            const AddrIcon = addr.type === "Home" ? Home : Briefcase;
            return (
              <div key={addr.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#B3D9CE] flex items-center justify-center shrink-0">
                    <AddrIcon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{addr.type}</span>
                  {addr.isDefault && (
                    <StatusBadge variant="default">Default</StatusBadge>
                  )}
                  <div className="ml-auto flex gap-1">
                    <button
                      onClick={() => openEditAddress(addr)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-black hover:text-gray-600 transition-colors"
                    >
                      <SquarePen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(addr.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed ml-10">
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.pinCode}<br />
                  {addr.country}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      {editPersonalOpen && (
        <EditPersonalInfoModal
          user={user}
          onClose={() => setEditPersonalOpen(false)}
        />
      )}

      {addressModalOpen && (
        <AddressModal
          user={user}
          editingAddress={editingAddress}
          onClose={() => { setAddressModalOpen(false); setEditingAddress(null); }}
        />
      )}

      <ConfirmDialog
        open={!!deletingId}
        title="Delete Address"
        description="Are you sure you want to remove this address? This cannot be undone."
        onConfirm={handleDeleteAddress}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
