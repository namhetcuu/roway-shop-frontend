import axios from "axios";
import Cookies from "js-cookie";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductReviewRequest } from "types/product/product-review-request.type";
import { ProductReviewResponse } from "types/product/product-review-response.type";

// Khởi tạo API client
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/products-review",
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

// Khởi tạo service chỉ gọi API mà không xử lý logic
export const productReviewService = {
  // Thêm hoặc cập nhật đánh giá sản phẩm
  addOrUpdateReview: (reviewData: ProductReviewRequest) => {
    return apiClient.post("/add-or-update", reviewData)
      .then(response => response.data?.data);
  },

  // Lấy danh sách đánh giá của sản phẩm theo phân trang
  getReviewsByProduct: (productId: number, page: number = 0, size: number = 10): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> => {
    return apiClient.get(`/product/${productId}?page=${page}&size=${size}`)
      .then(response => response.data);
  },

  // Lấy danh sách đánh giá của người dùng
  getReviewsByUser: (page: number = 0): Promise<ApiResponse<PaginatedResponse<ProductReviewResponse>>> => {
    return apiClient.get(`/user?page=${page}`)
      .then(response => response.data);
  },

  // Xóa đánh giá sản phẩm
  deleteReview: (reviewId: number) => {
    return apiClient.delete(`/remove/${reviewId}`)
      .then(response => response.data?.data);
  },

  // Đặt đánh giá mặc định
  setDefaultReview: (reviewId: number) => {
    return apiClient.put(`/set-default/${reviewId}`)
      .then(response => response.data?.data);
  }
};
