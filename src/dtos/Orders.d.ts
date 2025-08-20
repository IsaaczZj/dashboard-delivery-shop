interface GetOrdersResponse {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}
interface GetOrdersQuery {
  pageIndex?: number | null;
  customerName?: string | null;
  orderId?: string | null;
  status?: string | null;
}
