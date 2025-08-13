import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./ui/button";

interface PaginationProps {
  pageIndex: number;
  totalRegisters: number;
  perPage: number;
}
export function Pagination({
  pageIndex,
  perPage,
  totalRegisters,
}: PaginationProps) {
  const pages = Math.ceil(totalRegisters / perPage) || 1;

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {totalRegisters} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Primeira página"
          >
            <ChevronsLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Página anterior"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Próxima página"
          >
            <ChevronRight className="size-5" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Última página"
          >
            <ChevronsRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
