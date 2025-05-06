"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import FavouriteButton from "@/components/shared/FavouriteButton";
import { AuthProvider } from "@/contexts/AuthContext";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { ProductCardProps } from "types/type";

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, name, salePercentage = 0, mainImageUrl, slug, variants = [] } = product;
  const [selectedImage, setSelectedImage] = useState<string | File>(mainImageUrl);
  const tags = product.tags || [];

  // Tính toán giá sản phẩm tối ưu
  const price = useMemo(() => {
    return variants.length > 0 && variants[0].sizes.length > 0
      ? variants[0].sizes[0].price
      : 0;
  }, [variants]);

  const salePrice = useMemo(() => {
    return salePercentage > 0 ? price * ((100 - salePercentage) / 100) : price;
  }, [price, salePercentage]);

  const handleImageChange = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleAddToCart = () => {
    onAddToCart(id);
  };

  return (
    <div key={id} className="bg-white p-4 rounded-lg hover:bg-gray-50 relative">
      {/* Sale label */}
      <div className="absolute top-6 ml-2 z-10">
        {salePercentage > 0 && (
          <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded-full">
            {salePercentage}% giảm
          </span>
        )}
      </div>

      {/* Favourite Button */}
      <div className="absolute top-5 right-5 z-10">
        <FavouriteButton product={product} />
      </div>

      {/* Product Image */}
      <AuthProvider>
        <div className="aspect-square">
          <Link href={`/products/${slug}`} className="block w-full h-full">
            <Image
              src={typeof selectedImage === "string" ? selectedImage : "/default-image.jpg"}
              alt={name || "Product"}
              width={300}
              height={300}
              className="w-full aspect-square object-cover rounded-md mb-4"
              onError={(e) => ((e.currentTarget.src = "/default-image.jpg"))}
              placeholder="blur"
              blurDataURL="/default-image.jpg"
            />
          </Link>
        </div>
      </AuthProvider>

      {/* Product Info */}
      <div className="">
        <Link href={`/products/${slug}`} className="font-medium text-lg">
          {name}
        </Link>

        {/* Variants (Colors) */}
        {variants.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {variants.map(({ color, imageUrl }, index) => (
              <button
                key={index}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-transform ${
                  selectedImage === imageUrl ? "border-black scale-110 shadow-md" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => handleImageChange(imageUrl as string)}
                title={color}
              ></button>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <div className="space-x-3">
            <span className="text-red-500 font-b text-2xl">{salePrice.toLocaleString()}đ</span>
            {salePercentage > 0 && (
              <span className="line-through text-gray-400 text-sm ml-2">{price.toLocaleString()}đ</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-200 text-black p-2 rounded-full hover:bg-white flex items-center justify-center"
          >
            <ShoppingCart className="text-black" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
