import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./OrderDetails";
import { OrderStatus, type OrderStatusType } from "@/components/OrderStatus";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/store-orders/cancel-order";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { approveOrder } from "@/api/store-orders/approve-order";
import { deliverOrder } from "@/api/store-orders/deliver-order";
import { dispatchOrder } from "@/api/store-orders/dispatch-order";

interface OrderItemProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderItem({ order }: OrderItemProps) {
  const [isDetailsOpen, setIsDetailOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            };
          }

          return order;
        }),
      });
    });
    if (status === "canceled") {
      toast.success(`Pedido da ${order.customerName} cancelado com sucesso`);
    } else if (status === "pending") {
      toast.success(
        `Pedido da ${order.customerName} foi aprovado com sucesso com sucesso`,
      );
    } else if (status === "delivering") {
      toast.success(`Pedido da ${order.customerName} foi colocado em rota`);
    } else if (status === "delivered") {
      toast.success(`Pedido da ${order.customerName} entregue com sucesso`);
    } else if (status === "processing") {
      toast.success(`Pedido da ${order.customerName} foi colocado em preparo`);
    }
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "canceled");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          return toast.error(error.message);
        }
        return toast.error(String(error));
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });
  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });
  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess: (_, { orderId }) => {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <TableRow>
      <TableCell className="py-4">
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" title="Detalhes do pedido">
              <Search className="size-3" />
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs">{order.orderId}</TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchingOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Em entrega
          </Button>
        )}
        {order.status === "delivering" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliveringOrder}
          >
            <ArrowRight className="mr-2 size-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
