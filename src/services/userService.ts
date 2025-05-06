import axios from "axios";
import Cookies from "js-cookie";
import { PaginatedResponse } from "types/api-response.type";
import { ChangePasswordRequest } from "types/user/change-password-request.type";
import { UserCreateRequest } from "types/user/user-creation-request.type";
import { UserResponse } from "types/user/user-creation-response.type";
import { UserUpdateRequest } from "types/user/user-update-request.type";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  async getUser(id: number): Promise<UserResponse> {
    const response = await apiClient.get(`/${id}`);
    return response.data?.data;
  },

  async getCurrentUser(): Promise<UserResponse> {
    const response = await apiClient.get("/me"); 
    return response.data?.data;
  },
  
  async getAllUsers(page: number = 0, pageSize: number = 10): Promise<PaginatedResponse<UserResponse>> {
    const response = await apiClient.get(`?page=${page}&size=${pageSize}`);
    return response.data;
  },

  async createUser(user: UserCreateRequest): Promise<UserResponse> {
    const response = await apiClient.post("", user);
    return response.data?.data;
  },

  async updateUser(id: number, user: UserUpdateRequest): Promise<UserResponse> {
    const response = await apiClient.put(`/${id}`, user);
    return response.data?.data;
  },

  async updateUserInfo(user: UserUpdateRequest): Promise<UserResponse> {
    const response = await apiClient.put("/me/update-info", user);
    return response.data?.data;
  },

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/${id}`);
  },

  async changePassword(passwordData: ChangePasswordRequest): Promise<{ success: boolean; message?: string }> {
    const response = await apiClient.put("/change-password", passwordData);
    return response.data;
  },
};