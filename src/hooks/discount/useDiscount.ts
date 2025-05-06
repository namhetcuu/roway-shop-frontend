import { useState, useEffect, useCallback } from "react";
import { discountService } from "@/services/discountService";
import { DiscountResponse } from "types/discount/discount-response.type";
import { DiscountRequest } from "types/discount/discount-request.type";
import { DiscountPreviewRequest } from "types/discount/discount-preview-request.type";

export const useDiscounts = () => {
  const [discounts, setDiscounts] = useState<DiscountResponse[] | null>(null);
  const [userDiscountCodes, setUserDiscountCodes] = useState<DiscountResponse[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  // 🟢 Lấy danh sách mã giảm giá với phân trang
  const fetchDiscounts = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const discountData = await discountService.getAllDiscounts(page, size);
      setDiscounts(discountData.data.items);  // Lưu các item trong data
      setPagination({
        currentPage: discountData.data.currentPage,
        totalPages: discountData.data.totalPages,
        totalElements: discountData.data.totalElements,
        pageSize: discountData.data.pageSize,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lấy danh sách mã giảm giá");
      setDiscounts(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDiscounts(); // Gọi lần đầu tiên khi component mount
  }, [fetchDiscounts]);

  // 🟢 Lấy mã giảm giá theo ID
  const getDiscountById = useCallback(async (id: number): Promise<DiscountResponse | null> => {
    setLoading(true);
    try {
      return await discountService.getDiscountById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lấy mã giảm giá");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔵 Thêm mã giảm giá mới
  const addDiscount = useCallback(async (discountData: Partial<DiscountRequest>) => {
    setLoading(true);
    try {
      await discountService.createDiscount(discountData);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi thêm
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi thêm mã giảm giá");
    } finally {
      setLoading(false);
    }
  }, [fetchDiscounts, pagination.currentPage, pagination.pageSize]);

  // 🟡 Cập nhật mã giảm giá
  const updateDiscount = useCallback(async (id: number, discountData: Partial<DiscountRequest>) => {
    setLoading(true);
    try {
      await discountService.updateDiscount(id, discountData);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi cập nhật
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi cập nhật mã giảm giá");
    } finally {
      setLoading(false);
    }
  }, [fetchDiscounts, pagination.currentPage, pagination.pageSize]);

  // 🔴 Xóa mã giảm giá
  const removeDiscount = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await discountService.deleteDiscount(id);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi xóa
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa mã giảm giá");
    } finally {
      setLoading(false);
    }
  }, [fetchDiscounts, pagination.currentPage, pagination.pageSize]);

  // 🟠 Xem trước số tiền giảm giá
  const previewDiscount = useCallback(async (request: DiscountPreviewRequest): Promise<DiscountResponse | null> => {
    setLoading(true);
    try {
      return await discountService.previewDiscount(request);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xem trước giảm giá");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟠 Xóa tất cả user và sản phẩm khỏi mã giảm giá
  const clearUsersAndProducts = async (id: number) => {
    setLoading(true);
    try {
      await discountService.clearUsersAndProducts(id);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi xóa
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa tất cả user và sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // 🟣 Xóa sản phẩm khỏi mã giảm giá
  const removeProductsFromDiscount = async (id: number, productIds: number[]) => {
    setLoading(true);
    try {
      await discountService.removeProductsFromDiscount(id, productIds);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi xóa sản phẩm
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa sản phẩm khỏi mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  // 🟤 Xóa user khỏi mã giảm giá
  const removeUsersFromDiscount = async (id: number, userIds: number[]) => {
    setLoading(true);
    try {
      await discountService.removeUsersFromDiscount(id, userIds);
      fetchDiscounts(pagination.currentPage, pagination.pageSize); // Lấy lại danh sách sau khi xóa user
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa user khỏi mã giảm giá");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Lấy danh sách mã giảm giá của user hiện tại với phân trang
  const fetchUserDiscountCodes = async (page = 0, size = 10) => {
    setLoading(true);
    try {
      const response = await discountService.getUserDiscountCodes(page, size);
      setUserDiscountCodes(response.data.items); // Lưu toàn bộ thông tin voucher thay vì chỉ `code`
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
        pageSize: response.data.pageSize,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lấy danh sách mã giảm giá của user");
      setUserDiscountCodes(null);
    } finally {
      setLoading(false);
    }
  };

  const saveDiscountCode = async (discountCode: string): Promise<string> => {
    return await discountService.saveDiscountCode(discountCode);
  };

  return {
    discounts,
    userDiscountCodes,
    loading,
    error,
    addDiscount,
    updateDiscount,
    removeDiscount,
    previewDiscount,
    getDiscountById,
    saveDiscountCode,
    clearUsersAndProducts,
    removeProductsFromDiscount,
    removeUsersFromDiscount,
    fetchUserDiscountCodes,
    pagination, // Trả về thông tin phân trang
  };
};
