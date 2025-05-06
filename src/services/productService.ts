import { ProductResponse } from "types/product/product-response.types";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import Cookies from "js-cookie";
import axios from "axios";
// Khởi tạo API client
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
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


// 🟢 Lấy danh sách sản phẩm (có phân trang)
export const getProducts = async (page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await apiClient.get(`/api/products?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo ID
export const getProductById = async (id: number): Promise<ApiResponse<ProductResponse>> => {
  const response = await apiClient.get(`/api/products/${id}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo Slug
export const getProductBySlug = async (slug: string): Promise<ApiResponse<ProductResponse>> => {
  const response = await apiClient.get(`/api/products/slug/${slug}`);
  return response.data;
};

// 🟢 Lấy sản phẩm theo danh mục
export const getProductsByCategory = async (categorySlug: string, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await apiClient.get(`/api/products/find-by-category-slug/${categorySlug}?page=${page}&size=${pageSize}`);
  return response.data;
};

// 🔵 Thêm sản phẩm mới
export const createProduct = async (productData: FormData): Promise<ApiResponse<ProductResponse>> => {
  const response = await apiClient.post("/api/products", productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// 🟡 Cập nhật sản phẩm
export const updateProduct = async (id: number, productData: FormData): Promise<ApiResponse<ProductResponse>> => {
  const response = await apiClient.put(`/api/products/${id}`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
export const searchProductsByName = async (name: string, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await apiClient.get(`/api/products/search`, {
    params: { name, page, size: pageSize },
  });
  return response.data;
};
// 🔴 Xóa sản phẩm
export const deleteProduct = async (id: number): Promise<boolean> => {
  const response = await apiClient.delete(`/api/products/${id}`);
  return response.data === "Deleted";
};
// 🟢 Filter products with multiple parameters
export const filterProducts = async (filters: Record<string, string>, page = 0, pageSize = 9): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await apiClient.get("/api/products/filter", {
    params: { ...filters, page, size: pageSize },
  });
  return response.data;
};
// ✅ Lấy danh sách sản phẩm đã xem (có phân trang)
export const getFeaturedProduct = async (
  page = 0,
  pageSize = 8
): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  const response = await apiClient.get(`/api/products/featured?page=${page}&size=${pageSize}`);
  return response.data;
};

// ✅ Đánh dấu sản phẩm là đã xem (sửa lại)
export const markProductAsViewed = async (productId: number): Promise<void> => {
  await apiClient.post(`/api/products/mark`, { productId }); // 🔧 Gửi qua body
};

// ✅ Lấy danh sách sản phẩm đã xem (có phân trang)
export const getRecentlyViewedProducts = async (
  page = 0,
  pageSize = 10
): Promise<PaginatedResponse<ProductResponse>> => {
  const response = await apiClient.get(`/api/products/recently-viewed?page=${page}&size=${pageSize}`);
  return response.data.data;
};

// ✅ Đồng bộ danh sách sản phẩm đã xem từ client lên server
export const syncViewedProducts = async (productIds: number[]): Promise<void> => {
  await apiClient.post(`/api/products/viewed-sync`, productIds);
};
