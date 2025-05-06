"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import ProductCard from "./components/ProductCard";
import Breadcrumb from "@/components/shared/Breadcrumb";
import BackToTopButton from "@/components/shared/BackToTopButton";
import LoadingScreen from "@/components/shared/LoadingScreen";
import ReviewsProduct from "./components/ReviewsProduct";
import ProductDescription from "./components/ProductDescription";
import { useProducts } from "@/hooks/products/useProducts";
import { useOrders } from "@/hooks/order/useOrder";
import ViewedProduct from "./components/ViewedProduct";

const ProductPage: React.FC = () => {
  const { slug } = useParams();
  const { selectedProduct, loading: productLoading, fetchProductBySlug } = useProducts();
  const { checkProductDeliveryStatus } = useOrders();

  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [deliveryStatus, setDeliveryStatus] = useState({
    isDelivered: false,
    isLoading: false,
  });

  const hasCheckedDelivery = useRef(false);

  // Fetch product data
  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug as string);
    }
  }, [slug, fetchProductBySlug]); // Ensure fetchProductBySlug is included as dependency

  // Check delivery status when product is loaded and reviews tab is active
  const checkDelivery = useCallback(async () => {
    if (!selectedProduct || activeTab !== "reviews" || hasCheckedDelivery.current) return;

    setDeliveryStatus({ isDelivered: false, isLoading: true });
    try {
      const isDelivered = await checkProductDeliveryStatus(selectedProduct.id);
      setDeliveryStatus({ isDelivered, isLoading: false });
      hasCheckedDelivery.current = true;
    } catch {
      setDeliveryStatus({ isDelivered: false, isLoading: false });
    }
  }, [selectedProduct, activeTab, checkProductDeliveryStatus]);

  useEffect(() => {
    checkDelivery(); // Call the checkDelivery function
  }, [selectedProduct, activeTab, checkDelivery]); // Ensure checkDelivery is called properly

  if (productLoading) return <LoadingScreen />;
  if (!selectedProduct) return <div className="text-center text-red-500 mt-10">Không tìm thấy sản phẩm.</div>;

  return (
    <main className="bg-white">
      <div className="border-b border-gray-200">
        <Breadcrumb />
      </div>

      <ProductCard product={selectedProduct} onAddToCart={() => { }} />

      {/* Tab navigation */}
      <div className="flex justify-center border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              className={`py-4 px-1 relative font-medium text-sm ${activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab(tab as "description" | "reviews")}
            >
              {tab === "description" ? "Mô tả sản phẩm" : `Đánh giá (${selectedProduct.reviewCount || 0})`}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="pb-12">
        {activeTab === "description" ? (
          <div className="text-center">
            <ProductDescription product={selectedProduct} />
          </div>
        ) : deliveryStatus.isLoading ? (
          <div className="py-8">Đang kiểm tra trạng thái đơn hàng...</div>
        ) : (
          <ReviewsProduct productId={selectedProduct.id} isOrderDelivered={deliveryStatus.isDelivered} />
        )}
      </div>

      <ViewedProduct />
      <BackToTopButton />
    </main>
  );
};

export default ProductPage;
