import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button.tsx";

interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onChange: (page: number) => void;
  className?: string;
}

const MAX_VISIBLE_PAGES = 5;

const getVisiblePages = (currentPage: number, totalPages: number) => {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const half = Math.floor(MAX_VISIBLE_PAGES / 2);

  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 1) {
    start = 1;
    end = MAX_VISIBLE_PAGES;
  }

  if (end > totalPages) {
    end = totalPages;
    start = totalPages - MAX_VISIBLE_PAGES + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export const Pagination = ({
  page,
  total,
  perPage,
  onChange,
  className,
}: PaginationProps) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className={cn("flex items-center justify-start gap-3", className)}>
      <Button
        type="button"
        variant="pagination"
        size="pagination"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft />
      </Button>

      {visiblePages.map((pageNumber) => {
        const isActive = pageNumber === page;

        return (
          <Button
            key={pageNumber}
            type="button"
            variant="pagination"
            size="pagination"
            onClick={() => onChange(pageNumber)}
            className={cn(
              isActive &&
                "border-avito-accent-primary text-avito-accent-primary hover:bg-avito-bg-surface",
            )}
          >
            {pageNumber}
          </Button>
        );
      })}

      <Button
        type="button"
        variant="pagination"
        size="pagination"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
