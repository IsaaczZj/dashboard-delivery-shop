import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderItem } from "./OrderItem";
import { OrdersFilters } from "./OrderFilters";

export function Orders() {
  return (
    <div className="flex flex-col gap-4">
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
              {Array.from({ length: 10 }).map((_, i) => (
                <OrderItem key={i} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
