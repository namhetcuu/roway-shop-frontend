import { useCart } from '@/hooks/cart/useCart';
import React, { useEffect, useMemo } from 'react'
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setCartFromBackend } from '@/redux/slices/cartSlice';

export const CartItem = () => {
    console.log("✅ CartItem mounted"); // thêm dòng này
    const dispatch = useDispatch();
    const {
        cart,
        error,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        clearCartItems
    } = useCart();

    
    // 🛑 Cập nhật Redux khi có dữ liệu từ useCart()
    useEffect(() => {
        if (cart) {
            dispatch(setCartFromBackend(cart.cartItems));
        }
    }, [cart, dispatch]);
    
    const cartRedux = useSelector((state: RootState) => state.cart.cart);
    const cartItems = useMemo(() => {
        const safeCart = Array.isArray(cartRedux) ? cartRedux : [];
        return [...safeCart].sort((a, b) => a.id - b.id);
      }, [cartRedux]);    
    const handleClearCart = () => {
        if (confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
            clearCartItems();
        }
    };

    return (
        <div>
            <div className="bg-white flex flex-col items-center">
                <div className="max-w-5xl w-full bg-white rounded-2xl p-8">
                    <h1 className="text-3xl font-bold text-center text-black mb-6">
                        🛍️ Giỏ hàng của bạn
                    </h1>

                    {error ? (
                        <p className="text-center text-red-500 font-semibold">{error}</p>
                    ) : cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Image
                                src="/images/not-found-order1.png" // Đường dẫn đến ảnh default
                                alt="Giỏ hàng trống"
                                width={300}
                                height={300}
                                className="mb-6"
                            />
                            <p className="text-center text-lg mb-4">Giỏ hàng của bạn đang trống</p>
                            <Link
                                href="/"
                                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                            >
                                Tiếp tục mua sắm
                            </Link>
                        </div>
                    ) : (
                        <>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-black text-white text-lg">
                                        <th className="py-4 px-6 text-left">Sản phẩm</th>
                                        <th className="py-4 px-6 text-center">Đơn giá</th>
                                        <th className="py-4 px-6 text-center">Số lượng</th>
                                        <th className="py-4 px-6 text-right">Tổng</th>
                                        <th className="py-4 px-6 text-center">Xóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} className="border-b border-[#e0d2bf]">
                                            <td className="py-6 px-6 flex items-center gap-4">
                                                <Image
                                                    src={item.mainImageUrl}
                                                    alt={item.productName}
                                                    width={64}
                                                    height={64}
                                                    className="object-cover rounded-lg shadow-md"
                                                />
                                                <span className="text-lg font-semibold">
                                                    {item.productName} - {item.color} - {item.sizeName}
                                                </span>
                                            </td>
                                            <td className="py-6 px-6 text-center font-semibold text-[#7a5e3a]">
                                                {item.price.toLocaleString("vi-VN")}₫
                                            </td>
                                            <td className="py-6 px-6 text-center">
                                                <div className="flex justify-center items-center gap-2">
                                                    <button
                                                        onClick={() => decreaseItemQuantity({ items: [item] })}
                                                        className={`p-2 bg-gray-200 rounded-full transition 
                                                        ${item.quantity > 1 ? "hover:bg-gray-300" : "opacity-50 cursor-not-allowed"}`}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="text-lg font-bold">{item.quantity}</span>
                                                    <button
                                                        onClick={() => {
                                                            if (item.quantity < item.stock) {
                                                                increaseItemQuantity({ items: [item] });
                                                            } else {
                                                                alert(`Sản phẩm "${item.productName}" chỉ còn ${item.inStock} sản phẩm!`);
                                                            }
                                                        }}
                                                        className={`p-2 bg-gray-200 rounded-full transition 
                                                        ${item.quantity < item.stock ? "hover:bg-gray-300" : "opacity-50 cursor-not-allowed"}`}
                                                        disabled={item.quantity >= item.stock}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-6 px-6 text-right font-bold text-[#9c7a41]">
                                                {item.subtotal.toLocaleString("vi-VN")}₫
                                            </td>
                                            <td className="py-6 px-6 text-center">
                                                <button
                                                    onClick={() => removeItemFromCart(item)}
                                                    className="p-2 text-red-500 hover:text-red-600 transition"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Tổng giá và hành động */}
                            <div className="flex justify-between items-center mt-8 px-6">
                                <Link
                                    href="/"
                                    className="text-red-500 font-medium hover:underline flex items-center"
                                >
                                    ← Tiếp tục mua sắm
                                </Link>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleClearCart}
                                        className="text-sm text-gray-600 hover:text-gray-800"
                                    >
                                        Xóa toàn bộ
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}