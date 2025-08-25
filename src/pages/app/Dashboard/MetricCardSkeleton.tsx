import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <>
      <Skeleton className="h-9 w-36 mt-2" />
      <Skeleton className="h-5 w-56" />
    </>
  );
}
