import { FamilyMember } from "@/types";

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: "fm-1",
    userId: "1",
    name: "John Williams",
    relationship: "Son",
    phone: "+1 (555) 111-1112",
    dob: "1988-03-20",
    gender: "Male",
    bloodGroup: "O+",
  },
  {
    id: "fm-2",
    userId: "1",
    name: "Sarah Williams",
    relationship: "Daughter",
    phone: "+1 (555) 111-1113",
    dob: "1992-07-12",
    gender: "Female",
    bloodGroup: "A+",
  },
  {
    id: "fm-3",
    userId: "1",
    name: "Michael Williams",
    relationship: "Spouse",
    phone: "+1 (555) 111-1114",
    dob: "1989-05-05",
    gender: "Male",
    bloodGroup: "B+",
  },
];
