"use client";

import { useState, useEffect, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import ProductList from "./components/ProductList";
import ProductListFilter from "./components/ProductListFilter";
import Breadcrumb from "@/components/shared/Breadcrumb";
import Filter from "./components/Filter";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function Page({ params }: PageProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);
  const appliedFilters = useSelector((state: RootState) => state.filter.appliedFilters);
  // Get slug only once
  useEffect(() => {
    let isMounted = true;
    const fetchParams = async () => {
      const resolvedParams = await params;
      if (isMounted) setSlug(resolvedParams.slug);
    };
    fetchParams();
    return () => {
      isMounted = false;
    };
  }, [params]);

  // Helper: Check if appliedFilters is actually active (not just an empty object or all empty strings)
  const hasActiveFilters = useMemo(() => {
    return Object.values(appliedFilters).some((val) => val && val.trim() !== "");
  }, [appliedFilters]);

  const toggleFilter = () => setShowFilter((prev) => !prev);

  return (
    <main className="bg-white">
      <div className="border-b border-gray-200">
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row container mx-auto px-4">
        {/* Sidebar Filter */}
        <div
          className={`w-full lg:w-1/4 mt-2 lg:mt-0 ${
            showFilter ? "block" : "hidden"
          } lg:block`}
        >
          <Filter />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-3/4">
          {hasActiveFilters ? (
            <ProductListFilter />
          ) : slug ? (
            <ProductList slug={slug} />
          ) : (
            <div className="p-4">Đang tải danh mục sản phẩm...</div>
          )}

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={toggleFilter}
            className="lg:hidden fixed top-20 right-4 z-50 p-3 text-black hover:text-gray-700 bg-white rounded-full shadow-md"
          >
            {showFilter ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </main>
  );
}
