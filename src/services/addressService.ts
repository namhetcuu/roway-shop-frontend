import axios from "axios";
import Cookies from "js-cookie";
import { AddressRequest } from "types/address/address-request.type";
import { AddressResponse } from "types/address/address-response.type";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/addresses",
  headers: { "Content-Type": "application/json" },
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

export const addressService = {
  // 🟢 Lấy danh sách địa chỉ của người dùng
  async getAddressesByUser(): Promise<AddressResponse[]> {
    const response = await apiClient.get("/me");
    console.log("API Response:", response.data); // 🛠 Kiểm tra dữ liệu từ API
    return response.data?.data || [];
  },

  // 🟢 Lấy địa chỉ theo ID
  async getAddressById(id: number): Promise<AddressResponse> {
    const response = await apiClient.get(`/${id}`);
    return response.data?.data;
  },

  // 🔵 Tạo địa chỉ mới
  async createAddress(addressData: AddressRequest): Promise<AddressResponse> {
    const response = await apiClient.post("", addressData);
    return response.data?.data;
  },

  // 🟡 Cập nhật địa chỉ theo ID
  async updateAddress(id: number, addressData: AddressRequest): Promise<AddressResponse> {
    const response = await apiClient.put(`/${id}`, addressData);
    return response.data?.data;
  },

  // 🔴 Xóa địa chỉ theo ID
  async deleteAddress(id: number): Promise<string> {
    const response = await apiClient.delete(`/${id}`);
    return response.data?.data; // API trả về `"Address has been deleted"`
  },

  // 🟠 Đặt địa chỉ mặc định
  async setDefaultAddress(id: number): Promise<AddressResponse> {
    const response = await apiClient.put(`/${id}/set-default`);
    return response.data?.data;
  },
};
