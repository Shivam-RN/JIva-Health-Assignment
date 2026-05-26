import { UserDetailPage } from "@/features/users/UserDetailsPage";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetail({
  params,
}: Props) {
  const { id } = await params;

  return (
    <UserDetailPage userId={id} />
  );
}