import React from "react";

interface IPaginationProps {
  count: number;
  next: string | null;
  previous: string | null;
  limit: number;
  onPageChange: (url: string | null) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  count,
  next,
  previous,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / limit);
  const currentPage = next
    ? Math.floor(
        parseInt(new URL(next).searchParams.get("offset") || "0") / limit
      )
    : totalPages;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      const offset = (page - 1) * limit;
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL
      const url = `${baseUrl}/careers/?limit=${limit}&offset=${offset}`;
      onPageChange(url);
    }
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(previous)}
        disabled={!previous}
        className={`px-4 py-2 rounded cursor-pointer ${
          !previous
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={page === "..."}
          className={`px-4 py-2 rounded cursor-pointer ${
            page === currentPage
              ? "bg-primary text-white font-bold"
              : page === "..."
              ? "bg-transparent text-gray-500 cursor-default"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className={`px-4 py-2 rounded cursor-pointer ${
          !next
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
