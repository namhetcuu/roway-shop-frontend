"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterProducts } from "@/hooks/filter/useFilter";
import ProductCard from "@/app/(pages)/categories/[slug]/components/ProductCard";
import { ChevronDownIcon, GridIcon, ListIcon } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import { ProductResponse } from "types/product/product-response.types";
import { RootState } from "@/redux/store";
import { setAppliedFilters } from "@/redux/slices/filterSlice";

const ProductListFilter: React.FC = () => {
    const dispatch = useDispatch();
    const appliedFilters = useSelector((state: RootState) => state.filter.appliedFilters);
    const [activeView, setActiveView] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("newest");
    const [page, setPage] = useState(0);

    const { products, loading, error } = useFilterProducts(appliedFilters, page);

    // Debug logs (optional)
    // if (process.env.NODE_ENV === "development") {
    //   console.log("ProductFilter", products);
    // }

    // Trigger Redux filter update when page/filter changes
    useEffect(() => {
        dispatch(setAppliedFilters(appliedFilters));
    }, [dispatch, appliedFilters]);

    const handleAddToCart = (productId: number) => {
        console.log(`Product with ID: ${productId} added to cart`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const totalPages =
        products?.data?.totalPages ? Math.ceil(products.data.totalPages / 9) : 0;

    const productItems = products?.data?.items || [];

    if (loading) return <p className="text-center py-10">Đang tải sản phẩm...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{`Có lỗi xảy ra: ${error}`}</p>;

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

            <div
                className={`mx-auto ${activeView === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    : "grid grid-cols-1 gap-6"
                    }`}
            >
                {productItems.length > 0 ? (
                    productItems.map((product: ProductResponse) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        Không có sản phẩm nào.
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </section>
    );
};

export default ProductListFilter;
