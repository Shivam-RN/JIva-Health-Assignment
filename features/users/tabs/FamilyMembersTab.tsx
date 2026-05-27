"use client";
import { useFamilyStore } from "@/store/familyStore";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AddFamilyMemberModal } from "@/components/forms/AddFamilyMemberModal";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useToast } from "@/components/ui/toaster";
import { Plus, Pencil, Trash2, Phone, Calendar, Users, HeartPulse } from "lucide-react";
import { useState } from "react";
import { formatShortDate } from "@/lib/utils";
import { FamilyMember } from "@/types";
import { EmptyState } from "@/components/shared/EmptyState";

interface Props { userId: string; }

export function FamilyMembersTab({ userId }: Props) {
  const { getMembersByUserId, deleteMember, isAddModalOpen, openAddModal, openEditModal } = useFamilyStore();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const members = getMembersByUserId(userId);

    const bloodVari = (bg: string) => {
    const map: Record<string, any> = {
      "A+": "blood", "A-": "blood", "B+": "blood", "B-": "blood",
      "AB+": "blood", "AB-": "blood", "O+": "blood", "O-": "blood",
    };
    return map[bg] ?? "gray";
  };
  const relVariant = (rel: string) => {
    const map: Record<string, any> = {
      Son: "son", Daughter: "daughter", Spouse: "spouse",
      Father: "father", Mother: "mother", Sibling: "sibling", Other: "other",
    };
    return map[rel] ?? "gray";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Order History</h3>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <EmptyState title="No family members" description="Add family members to this account." icon={<Users className="w-6 h-6 text-gray-400" />} />
      ) : (
        <div className="space-y-3">
          {members.map((member: FamilyMember) => (
            <div key={member.id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
              <UserAvatar name={member.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{member.name}</span>
                  <StatusBadge variant={relVariant(member.relationship)}>
                    {member.relationship}
                  </StatusBadge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {member.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" /> {member.phone}
                    </span>
                  )}
                  {member.dob && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {formatShortDate(member.dob)}
                    </span>
                  )}
                  {member.bloodGroup && (
                    <span className="flex items-center gap-1  ">
                      <HeartPulse className="w-4 h-4 text-red-700" />
                      <span className="text-red-700">
                         <StatusBadge variant={bloodVari(member.bloodGroup)}>
                    {member.bloodGroup}
                  </StatusBadge>
                        </span> 
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button
                  onClick={() => openEditModal(member)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletingId(member.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && <AddFamilyMemberModal userId={userId} />}

      <ConfirmDialog
        open={!!deletingId}
        title="Delete Family Member"
        description="Are you sure you want to remove this family member?"
        onConfirm={() => {
          if (deletingId) { deleteMember(deletingId); toast("Family member removed"); }
          setDeletingId(null);
        }}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
