"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "@/hooks/products/useProducts";
import ProductCard from "@/app/(pages)/categories/[slug]/components/ProductCard";
import { ChevronDownIcon, GridIcon, ListIcon } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { ProductResponse } from "types/product/product-response.types";

interface ProductListProps {
  slug: string;
}

const ProductList: React.FC<ProductListProps> = ({ slug }) => {
  const [activeView, setActiveView] = useState("grid"); // Default view: grid
  const [sortBy, setSortBy] = useState("newest"); // Default sort option: newest

  // Fetch products with pagination
  const {
    products,
    loading,
    error,
    page,
    totalPages,
    setPage,
    fetchProducts
  } = useProducts(slug);

  const handleAddToCart = (productId: number) => {
    console.log(`Product with ID: ${productId} added to cart`);
  };

  // When page changes, fetch new products
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchProducts(); // Re-fetch products for the new page
  };

  useEffect(() => {
    fetchProducts();
  }, [slug, page, fetchProducts]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="py-10">
      <div className="text-center mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold mb-4 sm:mb-0">Tất cả sản phẩm</h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-300 py-2 pl-4 pr-10 rounded-md text-sm font-medium focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon size={16} className="text-gray-400" />
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 border-l border-gray-300 pl-4">
              <button
                className={`p-1 rounded ${activeView === "grid" ? "bg-gray-100" : ""}`}
                onClick={() => setActiveView("grid")}
              >
                <GridIcon size={20} className="text-gray-600" />
              </button>
              <button
                className={`p-1 rounded ${activeView === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setActiveView("list")}
              >
                <ListIcon size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Dynamic grid or list view */}
      <div
        className={`mx-auto ${activeView === "grid"
          ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          : "grid grid-cols-1 gap-6"
          }`}
      >
        {products.map((product: ProductResponse) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ProductList;
