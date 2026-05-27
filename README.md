# Jiva Health — User Management Dashboard

A User Management Dashboard for a digital health platform built as part of the Jiva Health frontend assignment.

---

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Zustand** — state management
- **React Hook Form** + **Zod** — forms & validation
- **Lucide React** — icons

---

## Getting Started

**Prerequisites:** Node.js v18+

```bash
# 1. Clone the repo
git clone https://github.com/Shivam-RN/JIva-Health-Assignment.git

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — auto redirects to `/users`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production build |

---

## Folder Structure

```
jiva-health/
├── app/
│   ├── users/
│   │   ├── page.tsx                 
│   │   ├── layout.tsx                
│   │   └── [id]/
│   │       ├── page.tsx              
│   │       └── orders/[orderId]/
│   │           └── page.tsx         
│   ├── layout.tsx
│   ├── page.tsx                     
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Topbar.tsx
│   ├── shared/
│   │   ├── UserAvatar.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── SelectDropdown.tsx        
│   │   └── SharedInput.tsx           
│   ├── cards/
│   │   └── UserCard.tsx
│   ├── forms/
│   │   ├── AddUserModal.tsx
│   │   ├── EditPersonalInfoModal.tsx
│   │   ├── AddressModal.tsx
│   │   └── AddFamilyMemberModal.tsx
│   └── ui/
│       └── toaster.tsx
│
├── features/
│   ├── users/
│   │   ├── UserManagementPage.tsx
│   │   ├── UserDetailPage.tsx
│   │   └── tabs/
│   │       ├── OverviewTab.tsx
│   │       ├── OrdersTab.tsx
│   │       ├── PaymentsTab.tsx
│   │       └── FamilyMembersTab.tsx
│   └── orders/
│       └── OrderDetailPage.tsx
│
├── store/
│   ├── userStore.ts
│   ├── orderStore.ts
│   ├── paymentStore.ts
│   └── familyStore.ts
│
├── data/
│   ├── users.ts
│   ├── orders.ts
│   ├── payments.ts
│   └── familyMembers.ts
│
├── types/index.ts
└── lib/
    ├── utils.ts
    └── schemas.ts
```

---

## Features

- **User List** — stats cards, search by name/email/phone, filter by status & role, add user, upgrade to prime
- **User Detail** — avatar, metrics (orders, bookings, family, spent), status toggle, upgrade to prime
- **Overview Tab** — personal info (editable), addresses (add/edit/delete)
- **Orders Tab** — order list, inline status update, delete, view detail
- **Payments Tab** — payment history with transaction ID and method
- **Family Members Tab** — add/edit/delete members, live count update
- **Order Detail** — shipping address, payment info, delivery timeline, itemised medicine list

---

## Author

**Shivam Rana** — Frontend Developer  
[GitHub](https://github.com/Shivam-RN) · [LinkedIn](https://www.linkedin.com/in/shivamrana1809)
