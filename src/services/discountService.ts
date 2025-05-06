import axios from "axios";
import Cookies from "js-cookie";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { DiscountPreviewRequest } from "types/discount/discount-preview-request.type";
import { DiscountRequest } from "types/discount/discount-request.type";
import { DiscountResponse } from "types/discount/discount-response.type";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/discounts",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// ✅ Gắn Authorization token nếu có
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const discountService = {
  // 🟢 Lấy danh sách mã giảm giá
  async getAllDiscounts(page = 0, size = 10): Promise<ApiResponse<PaginatedResponse<DiscountResponse>>> {
    const response = await apiClient.get(`?page=${page}&size=${size}`);
    return response.data;
  },


  // 🟢 Lấy mã giảm giá theo ID
  async getDiscountById(id: number): Promise<DiscountResponse | null> {
    const response = await apiClient.get<ApiResponse<DiscountResponse>>(`/${id}`);
    return response.data.success ? response.data.data : null;
  },

  // 🔵 Tạo mã giảm giá mới
  async createDiscount(discountData: Partial<DiscountRequest>): Promise<DiscountResponse | null> {
    const response = await apiClient.post<ApiResponse<DiscountResponse>>("", discountData);
    return response.data.success ? response.data.data : null;
  },

  // 🟡 Cập nhật mã giảm giá
  async updateDiscount(id: number, discountData: Partial<DiscountRequest>): Promise<DiscountResponse | null> {
    const response = await apiClient.put<ApiResponse<DiscountResponse>>(`/${id}`, discountData);
    return response.data.success ? response.data.data : null;
  },

  // 🔴 Xóa mã giảm giá
  async deleteDiscount(id: number): Promise<boolean> {
    const response = await apiClient.delete<ApiResponse<{ success: boolean }>>(`/${id}`);
    return response.data.success;
  },

  // 🟠 Xóa tất cả user và sản phẩm khỏi mã giảm giá
  async clearUsersAndProducts(id: number): Promise<string> {
    const response = await apiClient.delete<ApiResponse<string>>(`/${id}/clear`);
    return response.data.success ? response.data.data : "";
  },

  // 🟣 Xóa sản phẩm khỏi mã giảm giá
  async removeProductsFromDiscount(id: number, productIds: number[]): Promise<string> {
    const response = await apiClient.delete<ApiResponse<string>>(`/${id}/remove-products`, {
      data: productIds,
    });
    return response.data.success ? response.data.data : "";
  },

  // 🟤 Xóa user khỏi mã giảm giá
  async removeUsersFromDiscount(id: number, userIds: number[]): Promise<string> {
    const response = await apiClient.delete<ApiResponse<string>>(`/${id}/remove-users`, {
      data: userIds,
    });
    return response.data.success ? response.data.data : "";
  },

  // 🟢 Lấy danh sách mã giảm giá của user hiện tại
  async getUserDiscountCodes(page = 0,size = 10): Promise<ApiResponse<PaginatedResponse<DiscountResponse>>> {
    const response = await apiClient.get(`/me?page=${page}&size=${size}`);
    return response.data;
  },


  async saveDiscountCode(discountCode: string): Promise<string> {
    const response = await apiClient.post<ApiResponse<string>>(`/save?discountCode=${encodeURIComponent(discountCode)}`);
    return response.data.success ? response.data.data : "";
  },

  // 🔵 Xem trước số tiền giảm giá trước khi đặt hàng
  async previewDiscount(request: DiscountPreviewRequest): Promise<DiscountResponse | null> {
    const response = await apiClient.post<ApiResponse<DiscountResponse>>("/preview-discount", request);
    return response.data.success ? response.data.data : null;
  },
};
