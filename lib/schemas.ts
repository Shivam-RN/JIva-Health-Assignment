import { z } from "zod";

export const addUserSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  areaDetail: z.string().optional(),
  pinCode: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("India"),
});

export type AddUserFormValues = z.infer<typeof addUserSchema>;

export const addFamilyMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  relationship: z.enum([
    "Son",
    "Daughter",
    "Spouse",
    "Father",
    "Mother",
    "Sibling",
    "Other",
  ]),
  phone: z.string().optional(),
  dob: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
});

export type AddFamilyMemberFormValues = z.infer<typeof addFamilyMemberSchema>;
