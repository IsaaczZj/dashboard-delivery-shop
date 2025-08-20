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
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

export function OrdersFilters() {
  const { register, handleSubmit, control } = useForm<OrderFiltersSchema>({
    resolver: zodResolver(orderFiltersSchema),
  });

  const [searchParams, setSearchParams] = useSearchParams();
  function handleFilter(data: OrderFiltersSchema) {
    console.log(data);
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
        type="number"
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
      <Button type="button" variant="outline" size={"sm"}>
        <X className="size-5" />
        Remover filtros
      </Button>
    </form>
  );
}
