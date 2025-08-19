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
  onPageChange: (pageIndex: number) => void;
}
export function Pagination({
  pageIndex,
  perPage,
  totalRegisters,
  onPageChange,
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
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Página anterior"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Próxima página"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="size-5" />
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            title="Última página"
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
