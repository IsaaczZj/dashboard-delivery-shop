import { getOrders } from "@/api/store-orders/get-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  orderFiltersSchema,
  type OrderFiltersSchema,
} from "@/schemas/orderFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

export function OrdersFilters() {
  const queryClient = new QueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const customerName = searchParams.get("customerName") ?? "";
  const status = searchParams.get("status")

  const { register, handleSubmit, control,reset } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
    defaultValues: {
      customerName,
      orderId,
      status: status ?? "all",
    },
  });

  function handleFilter({ orderId, customerName, status }: OrderFiltersSchema) {
    setSearchParams((prev) => {
      if (orderId) {
        prev.set("orderId", orderId);
      } else {
        prev.delete("orderId");
      }
      if (customerName) {
        prev.set("customerName", customerName);
      } else {
        prev.delete("customerName");
      }
      if (status) {
        prev.set("status", status);
      } else {
        prev.delete("status");
      }
      prev.set("page", "1");
      return prev;
    });
  }

  function handleClearFilter() {
    setSearchParams((prev) => {
      prev.delete("orderId");
      prev.delete("customerName");
      prev.delete("status");
      prev.set("page", "1");
      return prev;
    });
    reset()
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        placeholder="Id do pedido"
        className="h-8 w-auto"
        {...register("orderId")}
      />

      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[400px]"
        type="text"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { name, onChange, value, disabled } }) => (
          <Select
            defaultValue="all"
            name={name}
            onValueChange={onChange}
            value={value}
            disabled={disabled}
          >
            <SelectTrigger className="!h-8 w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">Todos status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="caceled">Cancelado</SelectItem>
              <SelectItem value="processing">Em preparo</SelectItem>
              <SelectItem value="delivering">Em preparo</SelectItem>
              <SelectItem value="delivered">Entregue</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Button type="submit" variant="secondary" size={"sm"}>
        <Search className="size-5" />
        Filtrar resultados
      </Button>
      <Button
        type="button"
        variant="outline"
        size={"sm"}
        onClick={handleClearFilter}
      >
        <X className="size-5" />
        Remover filtros
      </Button>
    </form>
  );
}
