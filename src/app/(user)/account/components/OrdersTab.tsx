import React, { useState, useRef, useCallback } from "react";
import OrderStatus from "../order/components/OrderStatus";
import OrderList from "../order/components/OrderList";
import StatusTabs from "../order/components/StatusTabs";
import { useOrders } from "@/hooks/order/useOrder";
import LoadingScreen from "@/components/shared/LoadingScreen";
import Image from "next/image";
export default function OrdersTab() {
  const { orders, loading, error, loadMoreOrders, pagination } = useOrders();
  const [activeTab, setActiveTab] = useState("all");

  const observerRef = useRef<IntersectionObserver | null>(null); // Để quan sát việc cuộn xuống cuối trang

  // Khi cuộn gần cuối thì gọi loadMoreOrders
  const lastOrderElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return; // Nếu đang tải thì không làm gì cả

      if (observerRef.current) observerRef.current.disconnect(); // Ngắt kết nối nếu có observer cũ

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreOrders(); // Nếu cuộn đến cuối thì tải thêm đơn hàng
        }
      });

      if (node) observerRef.current.observe(node); // Quan sát node mới
    },
    [loading, loadMoreOrders]
  );

  if (loading && orders.length === 0) return <LoadingScreen />;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  const validOrders = orders ?? [];

  const filteredOrders =
    activeTab === "all"
      ? validOrders
      : validOrders.filter((order) => order.status.toLowerCase() === activeTab);

  // 🔹 Tổng số tiền đã chi tiêu, đảm bảo orders không trống
  const totalSpent =
    filteredOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0).toLocaleString("vi-VN") + " đ";

  return (
    <div className="space-y-6">
      {/* Hiển thị số đơn hàng và tổng tiền chi tiêu */}
      <OrderStatus totalOrders={filteredOrders.length} totalSpent={totalSpent} />

      {/* Tab để lọc đơn hàng */}
      <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hiển thị danh sách đơn hàng theo tab đang chọn */}
      {filteredOrders.length > 0 ? (
        <div>
          <OrderList orders={filteredOrders} />
          {/* Quan sát phần tử cuối cùng của danh sách */}
          {filteredOrders.length > 0 && (
            <div ref={lastOrderElementRef} className="h-4"></div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 flex justify-center items-center">
        <Image
          src="/images/not-found-order1.png" // Đường dẫn đến ảnh default
          alt="Giỏ hàng trống"
          width={300}
          height={300}
          className="mb-6"
        />
      </p>
      
      )}

      {/* Hiển thị thông tin phân trang */}
      <div className="flex justify-between text-sm text-gray-600">
        <p>
          Trang {pagination.currentPage + 1} của {pagination.totalPages}
        </p>
        <p>{pagination.totalElements} đơn hàng</p>
      </div>
    </div>
  );
}
