import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";
import axios from "axios";
import { CategoryResponse } from "types/category/category-response.type";

export const useCategories = () => {
  const { token } = useAuthContext();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Hàm xử lý lỗi từ API
  const handleAxiosError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.message || "An error occurred.";
    }
    return "An unexpected error occurred.";
  };

  // Fetch danh sách danh mục
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await getAllCategories();
      if (response?.data && Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setError("No categories found.");
      }
    } catch (err) {
      setError(handleAxiosError(err));
    } finally {
      setLoading(false);
    }
  }, []);

  // Tạo mới một danh mục
  const createNewCategory = useCallback(
    async (formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const newCategory = await createCategory(token, formData);
        setCategories((prevCategories) => {
          if (!Array.isArray(prevCategories)) {
            return [newCategory];
          }
          return [...prevCategories, newCategory];
        });
        setMessage("Category created successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Cập nhật một danh mục
  const updateExistingCategory = useCallback(
    async (id: number, formData: FormData) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        const updatedCategory = await updateCategory(token, id, formData);
        setCategories((prevCategories) =>
          Array.isArray(prevCategories)
            ? prevCategories.map((category) =>
                category.id === id ? updatedCategory : category
              )
            : [updatedCategory]
        );
        setMessage("Category updated successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Xóa danh mục
  const deleteExistingCategory = useCallback(
    async (id: number) => {
      if (!token) return;
      setLoading(true);
      setError("");
      setMessage("");
      try {
        await deleteCategory(token, id);
        setCategories((prevCategories) =>
          Array.isArray(prevCategories)
            ? prevCategories.filter((category) => category.id !== id)
            : []
        );
        setMessage("Category deleted successfully!");
      } catch (err) {
        setError(handleAxiosError(err));
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // Fetch categories khi component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    message,
    fetchCategories,
    createNewCategory,
    updateExistingCategory,
    deleteExistingCategory,
  };
};