import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { OrderResponse } from "types/order/order-response.type";
import Image from "next/image";
// Format giá tiền
const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);

const OrderCard = ({ order }: { order: OrderResponse }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Mã đơn hàng: {order.id}</h3>
            <p className="text-sm text-gray-500">Ngày tạo: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
              ? "bg-green-100 text-green-800"
              : order.status === "shipping"
                ? "bg-blue-100 text-blue-800"
                : order.status === "cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="p-4">
        {order.orderItems.map((item, index) => (
          <div key={index} className="flex gap-4 mb-4 last:mb-0">
            <Image
              src={item.mainImageUrl || '/default-image.jpg'}  // Nếu không có URL, sử dụng ảnh mặc định
              alt={item.productName}
              width={80}  // Kích thước ảnh chiều rộng
              height={80} // Kích thước ảnh chiều cao
              className="object-cover rounded-md border"
            />
            <div>
              <h4 className="font-medium">{item.productName}</h4>
              <p className="text-sm text-gray-500">Size: {item.sizeName} | Màu: {item.color}</p>
              <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
              <p className="font-medium mt-1">{formatPrice(item.subtotal)}</p> {/* Hiển thị subtotal của sản phẩm */}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4 bg-gray-50">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Phí vận chuyển:</span>
          <span className="font-semibold">{formatPrice(order.shippingFee)}</span>
        </div>
        {order.discountAmount && (
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-500">Giảm giá:</span>
            <span className="font-semibold text-red-500">- {formatPrice(order.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-500">Tổng cộng:</span>
          <span className="font-semibold">{formatPrice(order.totalAmount)}</span>
        </div>
        <Link href={`/account/order/order-detail/${order.orderCode}`} className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-lg text-sm hover:bg-gray-100">
          Xem chi tiết <FiChevronRight />
        </Link>

      </div>
    </div>
  );
};

export default OrderCard;
