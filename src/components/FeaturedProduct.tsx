'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProductResponse, VariantResponse } from 'types/product/product-response.types';
import { useFeaturedProducts } from '@/hooks/products/useFeaturedProducts';
import FavouriteButton from './shared/FavouriteButton';

const ProductCard: React.FC<{ product: ProductResponse }> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<VariantResponse>(product.variants[0]);
  const firstSize = selectedVariant?.sizes?.[0];
  const hasDiscount = product.sale && firstSize?.priceAfterDiscount < firstSize?.price;

  return (
    <div className="hover:bg-gray-50 p-4 rounded-lg relative">
      {/* Badge giảm giá */}
      {hasDiscount && (
        <div className="absolute top-6 left-6">
          <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
            Giảm {product.salePercentage}% {/* Giảm giá */}
          </span>
        </div>
      )}

      {/* Nút yêu thích */}
      <div className="absolute top-6 right-6 z-10">
        <FavouriteButton product={product} />
      </div>

      {/* Hình ảnh sản phẩm */}
      <Image
        src={selectedVariant?.imageUrl || product.mainImageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="w-full aspect-square object-cover rounded-md mb-4"
      />

      {/* Tên sản phẩm */}
      <h3 className="font-medium text-lg">{product.name}</h3>

      {/* Màu sắc (variant) */}
      <div className="mt-2 text-sm text-gray-600">
        <div className="flex gap-2 flex-wrap mt-1">
          {product.variants.map((variant, index) => (
            <button
              key={index}
              className={`w-7 h-7 rounded-full border-2 transition-all ${selectedVariant.color === variant.color ? 'border-black scale-110' : 'border-gray-300'}`}
              style={{ backgroundColor: variant.color }}
              onClick={() => setSelectedVariant(variant)}
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      {product.tags && product.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 font-semibold text-blue-600 px-2 py-1 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Giá */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-red-500 font-semibold text-xl sm:text-2xl">
            {firstSize?.priceAfterDiscount?.toLocaleString('vi-VN')}đ
          </span>
          {hasDiscount && (
            <span className="line-through text-gray-400 text-sm ml-2">
              {firstSize?.price?.toLocaleString('vi-VN')}đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const FeaturedProduct: React.FC = () => {
  const {
    products,
    loading,
    error,
    fetchFeaturedProducts,
  } = useFeaturedProducts();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]); // Chỉnh lại tên hàm ở đây

  if (loading) return <p className="text-center py-10">Đang tải sản phẩm nổi bật...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Lỗi: {error}</p>;

  return (
    <>
      <h2 className="text-xl sm:text-3xl text-center font-semibold mb-6">
        Sản phẩm nổi bật
      </h2>
      <div className="w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl justify-center items-center mx-auto">
          {/* Sửa lại từ `featuredProducts` thành `products` */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedProduct;
