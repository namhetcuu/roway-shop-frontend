'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductResponse } from 'types/product/product-response.types';
import { useRecentlyViewedProducts } from '@/hooks/products/useRecentlyViewedProducts';
import FavouriteButton from '@/components/shared/FavouriteButton';

const DEFAULT_IMAGE = '/images/default-image.png';

interface ProductCardProps {
    product: ProductResponse;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState<string>(product.variants?.[0]?.color || '#000');
    const selectedVariant =
        product.variants.find((variant) => variant.color === selectedColor) || product.variants[0];

    const defaultSize = selectedVariant?.sizes?.[0];
    const price = defaultSize?.price || 0;
    const priceAfterDiscount = defaultSize?.priceAfterDiscount || price;

    const salePercentage =
        priceAfterDiscount < price
            ? Math.round((1 - priceAfterDiscount / price) * 100)
            : 0;

    const uniqueColors = Array.from(new Set(product.variants?.map((v) => v.color) || []));

    return (
        <div className="hover:bg-gray-50 p-4 rounded-lg relative">
            {salePercentage > 0 && (
                <div className="absolute top-6 left-6">
                    <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {salePercentage}% giảm
                    </span>
                </div>
            )}

            <div className="absolute top-6 right-6 z-10">
                <FavouriteButton product={product} />
            </div>

            <Link href={`/products/${product.slug}`} className="block">
                <Image
                    src={product.mainImageUrl || DEFAULT_IMAGE}
                    alt={product.name}
                    width={500}
                    height={500}
                    className="w-full aspect-square object-cover rounded-md mb-4"
                />
            </Link>

            <h3 className="font-medium text-lg">{product.name}</h3>

            {/* Color Picker */}
            {uniqueColors.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                    <div className="flex gap-2 flex-wrap mt-1">
                        {uniqueColors.map((color, index) => (
                            <button
                                key={index}
                                className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor === color
                                    ? 'border-black scale-110'
                                    : 'border-gray-300'
                                    }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                                title={color}
                            />
                        ))}
                    </div>
                </div>
            )}

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

            {/* Pricing */}
            <div className="flex items-center justify-between mt-3">
                <div>
                    <span className="text-red-500 font-semibold text-xl sm:text-2xl">
                        {priceAfterDiscount.toLocaleString('vi-VN')}đ
                    </span>
                    {priceAfterDiscount < price && (
                        <span className="line-through text-gray-400 text-sm ml-2">
                            {price.toLocaleString('vi-VN')}đ
                        </span>
                    )}
                </div>
                <button className="bg-gray-200 text-black p-2 rounded-full hover:bg-white flex items-center justify-center">
                    <ShoppingCart className="text-black" size={20} />
                </button>
            </div>
        </div>
    );
};

const RecentlyViewed: React.FC = () => {
    const { products, loading, error, fetchRecentlyViewed } = useRecentlyViewedProducts();

    useEffect(() => {
        fetchRecentlyViewed();
    }, [fetchRecentlyViewed]); // Đảm bảo rằng useEffect theo dõi các dependencies

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl sm:text-3xl text-center font-bold mb-6">
                Sản phẩm đã xem
            </h2>

            <div className="w-full p-6 rounded-lg">
                {loading && <p className="text-center text-gray-500">Đang tải sản phẩm...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && (!Array.isArray(products) || products.length === 0) && (
                    <p className="text-center text-gray-500">Bạn chưa xem sản phẩm nào.</p>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentlyViewed;
