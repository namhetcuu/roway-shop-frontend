import axios from "axios";
import Cookies from "js-cookie";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { OrderRequest } from "types/order/order-request.type";
import { OrderResponse } from "types/order/order-response.type";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/orders",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Tự động gắn Authorization token nếu có
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderService = {
  // Lấy danh sách đơn hàng của người dùng hiện tại
  async getOrdersByUser(page: number = 0, size: number = 10): Promise<ApiResponse<PaginatedResponse<OrderResponse>>> {
    const response = await apiClient.get(`/me?page=${page}&size=${size}`);
    return response.data;
  },

  // Lấy tất cả đơn hàng (admin)
  async getAllOrders(page: number = 0, size: number = 10): Promise<ApiResponse<PaginatedResponse<OrderResponse>>> {
    const response = await apiClient.get(`?page=${page}&size=${size}`);
    return response.data;
  },

  // Lấy đơn hàng theo ID
  async getOrderByOrderCode(orderCode: string): Promise<ApiResponse<OrderResponse>> {
    const response = await apiClient.get(`/${orderCode}`);
    return response.data || {};
  },

  // Tạo đơn hàng mới
  async createOrder(orderData: OrderRequest): Promise<ApiResponse<OrderResponse>> {
    const response = await apiClient.post("", orderData);
    return response.data || {};
  },

  // Cập nhật đơn hàng theo ID
  async updateOrder(id: number, orderData: OrderRequest): Promise<ApiResponse<OrderResponse>> {
    const response = await apiClient.put(`/${id}`, orderData);
    return response.data || {};
  },

  // Cập nhật trạng thái đơn hàng
  async updateOrderStatus(id: number, status: string): Promise<ApiResponse<OrderResponse>> {
    const response = await apiClient.patch(`/${id}/status?status=${status}`);
    return response.data || {};
  },
  // Thêm vào orderService.ts
  async checkProductDelivery(productId: number): Promise<ApiResponse<boolean>> {
    const response = await apiClient.get(`/check-delivery/${productId}`);
    return response.data;
  },
  // Hủy đơn hàng
  async cancelOrder(id: number): Promise<ApiResponse<string>> {
    const response = await apiClient.delete(`/${id}`);
    return response.data || {};
  },

  // Xóa đơn hàng (admin)
  async deleteOrder(id: number): Promise<ApiResponse<string>> {
    const response = await apiClient.delete(`/${id}/delete`);
    return response.data || {};
  },
};
