// components/ProductHighlight.tsx
import React from "react";

interface ProductHighlightProps {
  filterType: "product" | "featured" | null;
  setFilterType: (filter: "product" | "featured" | null) => void;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({ filterType, setFilterType }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center rounded-lg p-5 gap-y-4">
      {/* Left Section */}
      <div className="text-center md:text-left">
        <button className="bg-black text-red-500 px-4 py-2 rounded-full font-semibold">
          Kiểm tra sản phẩm
        </button>
        <h2 className="text-2xl font-bold mt-2">
          Được chế tạo bằng vật liệu tuyệt vời
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-2">
        <button
          onClick={() => setFilterType("product")}
          className={`rounded-full px-4 py-1 text-sm font-medium transition border ${filterType === "product"
            ? "bg-black text-white border-black"
            : "text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Sản phẩm
        </button>
        <button
          onClick={() => setFilterType("featured")}
          className={`rounded-full px-4 py-1 text-sm font-medium transition border ${filterType === "featured"
            ? "bg-black text-white border-black"
            : "text-gray-700 border-gray-400 hover:bg-gray-100"
            }`}
        >
          Nổi bật
        </button>
      </div>
    </div>
  );
};

export default ProductHighlight;
