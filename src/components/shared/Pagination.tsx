import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Thêm icon cho nút "Prev" và "Next"

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 space-x-4">
      {/* Nút Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      >
        <FaArrowLeft className="mr-2" />
      </button>

      {/* Hiển thị trang hiện tại và tổng số trang */}
      <span className="text-sm font-medium text-gray-700">
        {currentPage} / {totalPages}
      </span>

      {/* Nút Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-200 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
      >
        <FaArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
