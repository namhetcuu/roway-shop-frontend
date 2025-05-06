import api from "@/axios";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";
import { ProductResponse } from "types/product/product-response.types";
import { FilterOptions } from "types/type";

/**
 * Lọc sản phẩm theo nhiều tham số
 */
export const filterProducts = async (
  filters: Record<string, string>,
  page = 0,
  pageSize = 9
): Promise<ApiResponse<PaginatedResponse<ProductResponse>>> => {
  console.log("🔍 Đang truyền filters vào API:", filters);

  // Sửa phần khai báo kiểu trả về để không bị lỗi
  const res = await api.get<ApiResponse<PaginatedResponse<ProductResponse>>>("/api/products/filter", {
    params: { ...filters, page, size: pageSize },
  });

  return res.data;
};

/**
 * Lấy các tùy chọn lọc có sẵn
 */
export const getFilterOptions = async (): Promise<FilterOptions> => {
  const { data } = await api.get<{ data:FilterOptions }>("/api/products/options");
  return data.data;
};
 