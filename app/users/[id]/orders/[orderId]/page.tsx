import { OrderDetailPage } from "@/features/orders/OrderDetailPage";

interface Props {
  params: Promise<{
    id: string;
    orderId: string;
  }>;
}

export default async function OrderDetail({
  params,
}: Props) {
  const {
    id,
    orderId,
  } = await params;

  return (
    <OrderDetailPage
      userId={id}
      orderId={orderId}
    />
  );
}