import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function OrderItem() {
  return (
    <TableRow>
      <TableCell className="py-4">
        <Button variant="outline" size="sm" title="Detalhes do pedido">
          <Search className="size-3" />
        </Button>
      </TableCell>
      <TableCell className="font-mono text-xs">asdas2134asd58</TableCell>
      <TableCell className="text-muted-foreground">Ha 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="text-muted-foreground font-medium">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Isaac Medeiros</TableCell>
      <TableCell className="font-medium">R$ 50,25</TableCell>
      <TableCell>
        <Button variant="outline" size="sm">
          <ArrowRight className="mr-2 size-3" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="sm">
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
