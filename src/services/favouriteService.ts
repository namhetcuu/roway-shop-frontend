import axios from "axios";
import Cookies from "js-cookie"; // 🆕 Dùng để lấy token từ cookie
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { FavouriteResponse } from "types/favourite/favourite-response.type";

// ✅ Khởi tạo axios client
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/favourites",
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // 🔥 Quan trọng: Cho phép gửi cookie theo request
});

// ✅ Thêm Interceptor để tự động chèn token vào header
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const getFavourites = async (page: number = 0, size: number = 10): Promise<ApiResponse<PaginatedResponse<FavouriteResponse>>> => {
  const response = await apiClient.get("", {
    params: { page, size },
  });
  return response.data;
};

// ✅ API thêm sản phẩm vào danh sách yêu thích
export const addFavourite = async (productId: number): Promise<FavouriteResponse> => {
  const response = await apiClient.post<FavouriteResponse>("", { productId });
  return response.data;
};

// ✅ API xóa sản phẩm khỏi danh sách yêu thích
export const removeFavourite = async (productId: number) => {
  const response = await apiClient.delete(`/${productId}`);
  return response.data;
};
