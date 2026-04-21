import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationControlled({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const renderPageLinks = () => {
    const pages = [];
    const siblingCount = 1; // Number of pages to show on each side of current page

    // Always show first page
    pages.push(
      <PaginationItem key={1}>
        <PaginationLink 
          href="#" 
          isActive={currentPage === 1} 
          onClick={(e) => { e.preventDefault(); onPageChange(1); }}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Left Ellipsis
    if (currentPage > siblingCount + 2) {
      pages.push(<PaginationEllipsis key="left-ellipsis" />);
    }

    // Pages around current
    const start = Math.max(2, currentPage - siblingCount);
    const end = Math.min(totalPages - 1, currentPage + siblingCount);

    for (let i = start; i <= end; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={(e) => { e.preventDefault(); onPageChange(i); }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Right Ellipsis
    if (currentPage < totalPages - siblingCount - 1) {
      pages.push(<PaginationEllipsis key="right-ellipsis" />);
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={(e) => { e.preventDefault(); onPageChange(totalPages); }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}