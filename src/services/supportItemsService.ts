import axios from "axios";
import Cookies from "js-cookie";
import { ApiResponse } from "types/api-response.type";
import { SupportItemRequest } from "types/support/support-request.type";
import { SupportItemResponse } from "types/support/support-response.type";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/support",
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

export const supportItemService = {
  // 🟢 Lấy tất cả support items
  getAllSupportItems: async (): Promise<ApiResponse<SupportItemResponse[]>> => {
    const response = await apiClient.get("");
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟢 Lấy thông tin 1 support item theo ID
  getSupportItemById: async (id: number): Promise<ApiResponse<SupportItemResponse>> => {
    const response = await apiClient.get(`/${id}`);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟡 Tạo mới support item
  createSupportItem: async (data: SupportItemRequest): Promise<ApiResponse<SupportItemResponse>> => {
    const response = await apiClient.post("", data);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🟡 Cập nhật support item
  updateSupportItem: async (id: number, data: SupportItemRequest): Promise<ApiResponse<SupportItemResponse>> => {
    const response = await apiClient.put(`/${id}`, data);
    return response.data;  // Trả về dữ liệu đúng
  },

  // 🔴 Xóa support item theo ID
  deleteSupportItem: async (id: number): Promise<ApiResponse<string>> => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;  // Trả về dữ liệu đúng
  },
};
