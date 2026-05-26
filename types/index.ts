// User types
export type UserStatus = "Active" | "Inactive";
export type UserRole = "Patient" | "Nurse" | "Doctor" | "Support Staff";
export type UserType = "Normal User" | "Prime User" | "Support Staff";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Gender = "Male" | "Female" | "Other";

export interface Address {
  id: string;
  type: "Home" | "Work" | "Other";
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  type: UserType;
  dob: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  joinedDate: string;
  lastActive: string;
  appointmentCount: number;
  totalOrders: number;
  totalBookings: number;
  totalFamilyMembers: number;
  totalSpent: number;
  addresses: Address[];
}

// Order types
export type OrderStatus = "Delivered" | "Pending" | "Cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  title: string;
  status: OrderStatus;
  details: string;
  date: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  items: OrderItem[];
  shippingAddress: Address;
  timeline: {
    label: string;
    date: string;
    done: boolean;
  }[];
}

// Payment types
export type PaymentStatus = "Completed" | "Pending" | "Failed";
export type PaymentMethod = "UPI" | "Card" | "Cash" | "Net Banking";

export interface Payment {
  id: string;
  userId: string;
  title: string;
  status: PaymentStatus;
  details: string;
  date: string;
  amount: number;
  method: PaymentMethod;
}

// Family Member types
export type Relationship =
  | "Son"
  | "Daughter"
  | "Spouse"
  | "Father"
  | "Mother"
  | "Sibling"
  | "Other";

export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relationship: Relationship;
  phone: string;
  dob: string;
  gender: Gender;
  bloodGroup: BloodGroup;
}
