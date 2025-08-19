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

export function Orders() {
  const { data: result } = useQuery<GetOrdersResponse>({
    queryFn: getOrders,
    queryKey: ["orders"],
  });
  console.log(result);
  

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
                  <OrderItem order={order} key={order.orderId} />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>  
                <TableCell colSpan={8}>
                  <Pagination pageIndex={0} totalRegisters={105} perPage={10} />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
