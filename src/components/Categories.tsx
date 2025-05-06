"use client";

import { useEffect, useRef, useState } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategorySkeleton from "./categories/CategorySkeleton";

export default function Categories() {
  const { categories, fetchCategories } = useCategories();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      setLoading(false); // Cập nhật loading về false khi dữ liệu đã tải xong
    };

    fetchData();
  });

  useEffect(() => {
    if (categories.length > 5) {
      setShowArrows(true);
    } else {
      setShowArrows(false);
    }
  }, [categories]);

  // Scroll Left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll Right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 relative max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Danh Mục Sản Phẩm</h2>

      {showArrows && (
        <>
          <button
            onClick={scrollLeft}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </>
      )}

      {/* Hiển thị Skeleton nếu đang tải dữ liệu */}
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-auto scroll-smooth px-4 gap-3 ${categories.length > 5 ? "lg:grid lg:grid-cols-5 lg:overflow-hidden" : "justify-center"
          }`}
      >
        {loading || categories.length === 0 ? (
          Array.from({ length: 5 }).map((_, index) => <CategorySkeleton key={index} />)
        ) : (
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex gap-6 flex-shrink-0 items-center justify-between bg-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-lg transition w-60 lg:w-auto"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <button className="mt-3 px-4 bg-white border border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition">
                  Xem thêm
                </button>
              </div>

              <div className="w-24 h-24 sm:w-32 sm:h-32">
                <Image
                  src={category.image || "/default-category.jpg"}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
