"use client";
import Link from "next/link";
import { TruckIcon, AlertCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CartSummary: React.FC = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal >= 499000 ? 0 : 50000;
    const total = subtotal + shipping;
    const isCartEmpty = cart.length === 0;

    return (
        <div className="lg:w-1/3">
            <div className="border border-gray-200 rounded-md p-6 bg-white">
                <h2 className="text-lg font-medium mb-4">Tóm tắt đơn hàng</h2>
                
                {isCartEmpty ? (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-md flex items-start text-yellow-800">
                        <AlertCircle className="mr-2 mt-0.5 flex-shrink-0" size={18} />
                        <span>Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi thanh toán.</span>
                    </div>
                ) : (
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tạm tính</span>
                            <span className="font-medium">{subtotal.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Phí vận chuyển</span>
                            <span className="font-medium">
                                {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}
                            </span>
                        </div>
                        {shipping === 0 ? (
                            <div className="flex items-center text-green-600 text-sm">
                                <TruckIcon size={16} className="mr-1" />
                                <span>Đơn hàng đủ điều kiện miễn phí vận chuyển</span>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">
                                Thêm {(499000 - subtotal).toLocaleString()}đ để được miễn phí vận chuyển
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                            <span className="text-2xl font-bold text-[#7a5e3a]">
                                Tổng cộng: {total.toLocaleString("vi-VN")}₫
                            </span>
                        </div>
                    </div>
                )}

                {isCartEmpty ? (
                    <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-md font-medium cursor-not-allowed flex items-center justify-center"
                    >
                        Tiến hành thanh toán
                    </button>
                ) : (
                    <Link
                        href="/checkout"
                        className="w-full bg-gray-800 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center justify-center"
                    >
                        Tiến hành thanh toán
                    </Link>
                )}
            </div>
        </div>
    );
};

export default CartSummary;