import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "./OrderItem";
import { OrdersFilters } from "./OrderFilters";
import { Pagination } from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/store-orders/get-orders";
import { useSearchParams } from "react-router";
import z from "zod";

export function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const status = searchParams.get("status");
  const customerName = searchParams.get("customerName");

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result } = useQuery({
    queryKey: ["orders", pageIndex, customerName, orderId, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        customerName,
        orderId,
        status: status === "all" ? null : status,
      }),
  });
  function onPageChange(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", String(pageIndex + 1));
      return prev;
    });
  }

  return (
    <div className="flex min-h-screen flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-wide">Pedidos</h1>
      <div className="space-y-4">
        <OrdersFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[150px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[134px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result &&
                result.orders.map((order) => (
                  <OrderItem key={order.orderId} order={order} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8}>
                  {result && (
                    <Pagination
                      onPageChange={onPageChange}
                      pageIndex={result.meta.pageIndex}
                      totalRegisters={result.meta.totalCount}
                      perPage={result.meta.perPage}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
