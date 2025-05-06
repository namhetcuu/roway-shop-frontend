import { useState, useEffect, useCallback } from "react";
import { supportItemService } from "@/services/supportItemsService";
import { SupportItemResponse } from "types/support/support-response.type";
import { SupportItemRequest } from "types/support/support-request.type";

export const useSupportItems = (id?: number) => {
  const [supportItem, setSupportItem] = useState<SupportItemResponse | null>(null);
  const [supportItems, setSupportItems] = useState<SupportItemResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🟢 Lấy tất cả support items
  const fetchSupportItems = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supportItemService.getAllSupportItems();
      setSupportItems(data); // Set danh sách tất cả các support items
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải danh sách hỗ trợ.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 Lấy thông tin 1 support item theo ID
  const fetchSupportItemById = useCallback(async (supportItemId: number) => {
    setLoading(true);
    try {
      const { data } = await supportItemService.getSupportItemById(supportItemId);
      setSupportItem(data); // Set support item cụ thể
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải thông tin hỗ trợ.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Khi `id` thay đổi, tự động fetch dữ liệu
  useEffect(() => {
    if (id) {
      fetchSupportItemById(id);
    } else {
      fetchSupportItems();
    }
  }, [id, fetchSupportItemById, fetchSupportItems]);

  // 🟡 Tạo hỗ trợ item mới
  const createSupportItem = useCallback(async (data: SupportItemRequest) => {
    setLoading(true);
    try {
      const { data: newItem } = await supportItemService.createSupportItem(data);
      setSupportItems((prev) => [...prev, newItem]); // Thêm item mới vào danh sách
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tạo hỗ trợ item.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟡 Cập nhật hỗ trợ item
  const updateSupportItem = useCallback(async (id: number, data: SupportItemRequest) => {
    setLoading(true);
    try {
      const { data: updatedItem } = await supportItemService.updateSupportItem(id, data);
      setSupportItems((prev) => prev.map((item) => (item.id === id ? updatedItem : item))); // Cập nhật lại item trong danh sách
      setSupportItem(updatedItem); // Cập nhật item hiện tại
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể cập nhật thông tin hỗ trợ item.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Xóa hỗ trợ item
  const deleteSupportItem = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await supportItemService.deleteSupportItem(id);
      setSupportItems((prev) => prev.filter((item) => item.id !== id)); // Xóa item khỏi danh sách
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa hỗ trợ item.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    supportItem,
    supportItems,
    loading,
    error,
    createSupportItem,
    updateSupportItem,
    deleteSupportItem,
  };
};
