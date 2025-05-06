import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/categories", // Base URL
});
// Lấy danh sách tất cả các danh mục
export const getAllCategories = async () => {
  const response = await apiClient.get('');
  return response.data; // { items: [], currentPage: 0, totalPages: ..., etc. }
};


// Tạo mới một danh mục
export const createCategory = async (
  token: string,
  formData: FormData 
) => {
  const response = await apiClient.post("", formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Cập nhật một danh mục (sử dụng FormData)
export const updateCategory = async (
  token: string,
  id: number,
  formData: FormData 
) => {
  const response = await apiClient.put(`/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Xóa một danh mục
export const deleteCategory = async (token: string, id: number) => {
  const response = await apiClient.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
