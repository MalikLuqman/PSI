import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../../utils/icons";

export default function Pagination({ page, count }) {
  count = count ? count * 10 : 0;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / 10);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    page(pageNumber);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      page(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      page(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            aria-current={i === currentPage ? "page" : null}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              i === currentPage
                ? "z-10 bg-lime-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      const firstPages = [1, 2, 3];
      const lastPages = [totalPages - 1, totalPages];

      firstPages.forEach((i) => {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            aria-current={i === currentPage ? "page" : null}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              i === currentPage
                ? "z-10 bg-lime-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {i}
          </button>
        );
      });

      if (currentPage > 3 && currentPage <= totalPages - 2) {
        pages.push(
          <span
            key="ellipsis-start"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
            ...
          </span>
        );
        pages.push(
          <button
            key={currentPage}
            onClick={() => handlePageClick(currentPage)}
            aria-current={currentPage === currentPage ? "page" : null}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              currentPage === currentPage
                ? "z-10 bg-lime-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {currentPage}
          </button>
        );
      }

      pages.push(
        <span
          key="ellipsis-end"
          className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
        >
          ...
        </span>
      );

      lastPages.forEach((i) => {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            aria-current={i === currentPage ? "page" : null}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              i === currentPage
                ? "z-10 bg-lime-700 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            }`}
          >
            {i}
          </button>
        );
      });
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePreviousClick}
          className="relative inline-flex items-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(currentPage * 10, count)}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white"
          >
            <button
              onClick={handlePreviousClick}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextClick}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
