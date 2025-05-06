// hooks/cart/useCart.ts

import { useState, useEffect, useCallback } from 'react';
import * as cartService from '@/services/cartService';
import { CartRequest, CartItemRequest } from 'types/cart/cart-request.type';
import { CartResponse } from 'types/cart/cart-response.type';

export const useCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Lấy giỏ hàng của người dùng
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      // Thay vì setError, in lỗi ra console
      console.error('Lỗi khi lấy giỏ hàng:', err instanceof Error ? err.message : err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Thêm hoặc cập nhật sản phẩm vào giỏ hàng
  const addItemToCart = async (cartRequest: CartRequest) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.addOrUpdateProduct(cartRequest);
      setCart(updatedCart); // Cập nhật giỏ hàng sau khi thêm sản phẩm
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };
  

  // Tăng số lượng sản phẩm trong giỏ hàng
  const increaseItemQuantity = async (cartRequest: CartRequest) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.increaseProductQuantity(cartRequest);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tăng số lượng');
    } finally {
      setLoading(false);
    }
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const decreaseItemQuantity = async (cartRequest: CartRequest) => {
    setLoading(true);
    try {
      const updatedCart = await cartService.decreaseProductQuantity(cartRequest);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi giảm số lượng');
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItemFromCart = async (item: CartItemRequest) => {
    setLoading(true);
    try {
      // Truyền đúng các tham số cần thiết
      const updatedCart = await cartService.removeProduct({
        productId: item.productId,  // Truyền productId
        sizeName: item.sizeName,    // Truyền sizeName
        color: item.color           // Truyền color
      });
      setCart(updatedCart);  // Cập nhật giỏ hàng sau khi xóa
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi xóa sản phẩm');
    } finally {
      setLoading(false);
    }
  };
  

  // Xóa toàn bộ giỏ hàng
  const clearCartItems = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      setCart(null); // Giỏ hàng đã được xóa, set lại thành null
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi khi xóa giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    addItemToCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    clearCartItems,
  };
};
