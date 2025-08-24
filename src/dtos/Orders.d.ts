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

interface GetOrderResponse {
  id: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: number;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

interface GetOrderParams {
  orderId: string;
}

interface GetMonthOrdersAmountResponse{
  amount:number
  diffFromLastMonth:number
}
interface GetMonthOrdersRevenueResponse{
  receipt:number
  diffFromLastMonth:number
}
interface GetDayOrdersAmountResponse{
  amount:number
  diffFromYesterday:number
}
