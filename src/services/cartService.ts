// services/cartService.ts

import axios from 'axios';
import Cookies from "js-cookie";
import { CartRequest, CartItemRequest } from 'types/cart/cart-request.type';
import { CartResponse } from 'types/cart/cart-response.type';

// Tạo client Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/cart', // URL gốc của API
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
// ✅ Tự động gắn Authorization token nếu có
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Lấy giỏ hàng của người dùng
export const getCart = async (): Promise<CartResponse> => {
  const response = await apiClient.get('');
  return response.data.data;
};

// Thêm hoặc cập nhật sản phẩm trong giỏ hàng
export const addOrUpdateProduct = async (cartRequest: CartRequest): Promise<CartResponse> => {
  const response = await apiClient.post('/add-or-update', cartRequest);
  return response.data.data;
};

export const removeProduct = async (item: CartItemRequest): Promise<CartResponse> => {
  const response = await apiClient.delete('/remove', {
    params: {
      productId: item.productId,  
      sizeName: item.sizeName,    
      color: item.color           
    }
  });
  return response.data.data;
};




// Tăng số lượng sản phẩm trong giỏ hàng
export const increaseProductQuantity = async (cartRequest: CartRequest): Promise<CartResponse> => {
  const response = await apiClient.post('/increase', cartRequest);
  return response.data.data;
};

// Giảm số lượng sản phẩm trong giỏ hàng
export const decreaseProductQuantity = async (cartRequest: CartRequest): Promise<CartResponse> => {
  const response = await apiClient.post('/decrease', cartRequest);
  return response.data.data;
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async (): Promise<void> => {
  const response = await apiClient.delete('/clear');
  return response.data.data;
};
