// app/page.tsx
"use client";

import { useState } from "react";
import Banner from "@/components/Banner";
import Category from "@/components/Categories";
import FeaturedProduct from "@/components/FeaturedProduct";
import { Features } from "@/components/Features";
import ProductList from "@/components/ProductList";
import BackToTopButton from "@/components/shared/BackToTopButton";
import BannerSlider from "@/components/Sliders";
import ProductHighlight from "@/components/ProductHighlight";

export default function HomePage() {
  const [filterType, setFilterType] = useState<"product" | "featured" | null>("product");

  return (
    <main className="bg-white">
      {/* Slider */}
      <BannerSlider />

      {/* Danh mục sản phẩm */}
      <div className="py-8 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto">
          <Category />
        </div>
      </div>

      {/* Bộ lọc sản phẩm */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-4">
        <ProductHighlight filterType={filterType} setFilterType={setFilterType} />
      </div>

      {/* Danh sách sản phẩm hoặc nổi bật */}
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {filterType === "product" && <ProductList />}
        {filterType === "featured" && <FeaturedProduct />}
        {!filterType && (
          <>
            <ProductList />
            <FeaturedProduct />
          </>
        )}
      </div>

      {/* Banner */}
      <Banner />

      {/* Tính năng nổi bật */}
      <Features />
      <BackToTopButton />
    </main>
  );
}
