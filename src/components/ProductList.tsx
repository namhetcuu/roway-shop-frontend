"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/products/useProducts";
import FavouriteButton from "./shared/FavouriteButton";
import Image from "next/image";
import ProductSkeleton from "./products/ProductSkeleton";
import { ProductResponse } from "types/product/product-response.types";
import { useRecentlyViewedProducts } from "@/hooks/products/useRecentlyViewedProducts";

// Constants
const ITEMS_PER_PAGE = 8;
const DEFAULT_IMAGE_URL = "images/default-image.png";

const ProductList = () => {
  const {
    products,
    page,
    totalPages,
    fetchProducts,
    setPage,
  } = useProducts(undefined, 1, ITEMS_PER_PAGE);
  const { markAsViewed } = useRecentlyViewedProducts();
  const [selectedImages, setSelectedImages] = useState<Record<number, string>>({});
  const [filterType] = useState("all");
  const [localLoading, setLocalLoading] = useState(false);

  // Fetch products when page changes
  useEffect(() => {
    const loadProducts = async () => {
      setLocalLoading(true);
      await fetchProducts();
      setLocalLoading(false);
    };

    if (page === 1 && products.length === 0 || page > 1) {
      loadProducts();
    }
  }, [page, fetchProducts, products.length]);  // Thêm `products.length` vào dependency array

  const handleImageChange = useCallback((productId: number, imageUrl: string) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: imageUrl }));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(({ salePercentage, featured }) => {
      if (filterType === "featured") return featured;
      if (filterType === "discount") return salePercentage > 0;
      return true;
    });
  }, [products, filterType]);

  const handleLoadMore = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages, setPage]);

  const ProductCard = ({ product }: { product: ProductResponse }) => {
    const { id, name, salePercentage = 0, mainImageUrl = "", slug = "", tags = [], variants = [] } = product;
    const productImage = selectedImages[id] || mainImageUrl || DEFAULT_IMAGE_URL;
    const price = variants[0]?.sizes[0]?.price ?? 0;
    const salePrice = salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;

    const handleClick = () => {
      markAsViewed(id);
    };

    return (
      <div className="bg-white p-4 rounded-lg hover:bg-gray-50 relative overflow-hidden">
        {salePercentage > 0 && (
          <div className="absolute top-6 left-6 bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            {salePercentage}% giảm
          </div>
        )}

        <div className="absolute top-6 right-6 z-10">
          <FavouriteButton product={product} />
        </div>

        <Link href={`/products/${slug}`} className="block" onClick={handleClick}>
          <div className="relative w-full h-64">
            <Image
              src={productImage}
              alt={name || "Product Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="w-full h-full object-cover rounded-md"
              priority={id <= ITEMS_PER_PAGE}
            />
          </div>
        </Link>

        <div className="mt-4">
          <Link href={`/products/${slug}`} className="font-medium text-lg block" onClick={handleClick}>
            {name}
          </Link>

          {variants.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {variants.map(({ color, imageUrl }, index) => (
                <button
                  key={index}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${productImage === imageUrl ? "border-black scale-110 shadow-md" : "border-gray-300"}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => handleImageChange(id, imageUrl)}
                  title={color}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          )}

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-red-500 font-semibold text-2xl">
                {salePrice.toLocaleString()}đ
              </span>
              {salePercentage > 0 && (
                <span className="line-through text-gray-400 text-sm ml-2">
                  {price.toLocaleString()}đ
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Sản Phẩm</h2>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
          {products.length === 0 ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      {page < totalPages && (
        <div className="text-center mt-8">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
            onClick={handleLoadMore}
            disabled={localLoading}
          >
            {localLoading ? 'Đang tải...' : 'Xem thêm'}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
