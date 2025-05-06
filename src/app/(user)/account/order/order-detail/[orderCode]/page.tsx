"use client";

import { useParams, useRouter } from "next/navigation";
import { FiChevronLeft, FiTruck, FiRefreshCcw, FiStar, FiCalendar, FiCreditCard, FiCheckCircle, FiShoppingBag } from "react-icons/fi";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const Page = () => {
  const { orderCode } = useParams();
  const router = useRouter();

  const order = {
    orderCode,
    status: "delivered",
    createdAt: "2025-04-07T10:00:00",
    name: "Nguyễn Văn A",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phoneNumber: "0987654321",
    note: "Giao giờ hành chính",
    expectedDeliveryDate: "2025-04-10",
    deliveredDate: "2025-04-09T15:30:00",
    paymentMethod: "COD",
    items: [
      {
        productName: "Áo thun nam cao cấp phiên bản giới hạn",
        color: "Đỏ wine",
        sizeName: "M",
        quantity: 2,
        price: 450000,
        subtotal: 900000,
        mainImageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
      },
      {
        productName: "Quần jeans designer fit",
        color: "Xanh đậm vintage",
        sizeName: "32",
        quantity: 1,
        price: 1200000,
        subtotal: 1200000,
        mainImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
      }
    ],
    shippingFee: 0,
    discountAmount: 250000,
    totalAmount: 1850000,
    deliveryMethod: "Giao hàng tiêu chuẩn"
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "shipped":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "processing":
        return "bg-amber-50 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-800 border-rose-200";
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Giao hàng thành công";
      case "shipped":
        return "Đang vận chuyển";
      case "processing":
        return "Đang xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const statusSteps = [
    { id: 'ordered', name: 'Đặt hàng thành công', date: order.createdAt, completed: true },
    { id: 'processed', name: 'Đã xác nhận', date: '2025-04-07T12:30:00', completed: true },
    { id: 'shipped', name: 'Đã giao cho đơn vị vận chuyển', date: '2025-04-08T09:15:00', completed: true },
    { id: 'delivered', name: 'Giao hàng thành công', date: order.deliveredDate, completed: true },
  ];

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300 hover:shadow-inner"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="ml-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-sans">Đơn hàng #{order.orderCode}</h1>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1">
                <FiCalendar className="w-4 h-4" />
                {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
            In hóa đơn
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 text-sm font-medium">
            Mua lại
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        {/* Header với trạng thái đơn giản */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1.5 rounded-md ${getStatusColor(order.status)} flex items-center gap-2 text-sm font-medium`}>
              <FiCheckCircle className="w-4 h-4" />
              <span>{getStatusText(order.status)}</span>
            </div>
            {order.status === "delivered" && (
              <span className="text-sm text-gray-500">
                {new Date(order.deliveredDate).toLocaleDateString('vi-VN')}
              </span>
            )}
          </div>
        </div>

        {/* Timeline tối giản */}
        <div className="p-6">
          <div className="relative">
            {/* Đường timeline */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-200 via-gray-200 to-gray-200"></div>

            <div className="space-y-6">
              {statusSteps.map((step) => (
                <div key={step.id} className="relative pl-10">
                  {/* Dot indicator */}
                  <div className={`
              absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center
              ${step.completed
                      ? 'bg-emerald-500 ring-4 ring-emerald-100'
                      : 'bg-white border-2 border-gray-300'
                    }
            `}>

                    {step.completed && (
                      <FiCheckCircle className="w-3 h-3 text-white" />

                    )}

                  </div>

                  {/* Nội dung */}
                  <div className="flex flex-col">
                    <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                      {step.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(step.date).toLocaleString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </p>

                    {/* Thêm nút xem chi tiết vận chuyển nếu cần */}
                    {step.id === "shipped" && (
                      <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors self-start">
                        Theo dõi đơn hàng
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Delivery & Payment Info - Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Delivery Card */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiTruck className="text-blue-600" />
                Thông tin giao hàng
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phương thức vận chuyển</p>
                  <p className="font-medium">{order.deliveryMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Người nhận</p>
                  <p className="font-medium">{order.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Địa chỉ</p>
                  <p className="font-medium">{order.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Điện thoại</p>
                  <p className="font-medium">{order.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ghi chú</p>
                  <p className="font-medium">{order.note}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FiCreditCard className="text-blue-600" />
                Thông tin thanh toán
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phương thức</p>
                  <p className="font-medium">
                    {order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : "Thẻ tín dụng"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Tổng thanh toán</p>
                  <p className="font-medium text-lg text-emerald-600">{formatPrice(order.totalAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ngày thanh toán</p>
                  <p className="font-medium">
                    {new Date(order.deliveredDate).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items - Right Column */}
        {/* Order Items - Right Column */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Chi tiết sản phẩm ({order.items.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-5 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex gap-5">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={item.mainImageUrl}
                        alt={item.productName}
                        fill
                        className="object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs px-2 py-1 rounded shadow-sm">
                          Mới
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{item.productName}</h4>

                      <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div>
                          <p className="text-gray-500">Màu sắc</p>
                          <p className="font-medium flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: item.color === "Đỏ wine" ? "#722F37" : "#1E293B" }}></span>
                            {item.color}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Kích thước</p>
                          <p className="font-medium">{item.sizeName}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Số lượng</p>
                          <p className="font-medium">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Đơn giá</p>
                          <p className="font-medium">{formatPrice(item.price)}</p>
                        </div>
                      </div>

                      {/* Premium Actions */}
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-100"
                        >
                          <FiStar className="w-4 h-4" />
                          Đánh giá sản phẩm
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <FiRefreshCcw className="w-4 h-4" />
                          Đổi trả hàng
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <FiShoppingBag className="w-4 h-4" />
                          Mua lại
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-6"
          >
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Tóm tắt thanh toán
              </h3>
            </div>
            <div className="p-5">
              <div className="max-w-md ml-auto">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>{formatPrice(order.items.reduce((acc, item) => acc + item.subtotal, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className={order.shippingFee === 0 ? 'text-emerald-600 font-medium' : ''}>
                      {order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}
                    </span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="text-emerald-600 font-medium">- {formatPrice(order.discountAmount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3 mt-3"></div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-gray-800">Tổng cộng:</span>
                    <span className="text-emerald-600">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Premium Customer Support */}
      <div className="mt-10 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Cần hỗ trợ thêm?</h3>
          <p className="text-gray-600 mb-5">Đội ngũ chăm sóc khách hàng cao cấp của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Chat với hỗ trợ viên
            </button>
            <button className="px-5 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Gọi hotline: 1900 9999
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;