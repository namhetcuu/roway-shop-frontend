import { useState, useEffect, useCallback, useRef } from "react";
import { orderService } from "@/services/orderService";
import { OrderResponse } from "types/order/order-response.type";
import { OrderRequest } from "types/order/order-request.type";
import { ApiResponse, PaginatedResponse } from "types/api-response.type";

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]); // Dữ liệu đơn hàng
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái đang tải
  const [error, setError] = useState<string | null>(null); // Lỗi
  const [page, setPage] = useState<number>(0); // Trang hiện tại
  const [currentOrder, setCurrentOrder] = useState<OrderResponse | null>(null);
  const deliveryStatusCache = useRef<Record<number, boolean>>({});

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 10,
  });

  // Lấy danh sách đơn hàng từ API
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response: ApiResponse<PaginatedResponse<OrderResponse>> = await orderService.getOrdersByUser(page);
      if (response.success) {
        const orderData: PaginatedResponse<OrderResponse> = response.data;

        // Lọc đơn hàng trùng lặp
        setOrders((prevOrders) => {
          const newOrders = orderData.items.filter(
            (newOrder) => !prevOrders.some((order) => order.id === newOrder.id)
          );
          return [...prevOrders, ...newOrders];
        });

        setPagination({
          currentPage: orderData.currentPage,
          totalPages: orderData.totalPages,
          totalElements: orderData.totalElements,
          pageSize: orderData.pageSize,
        });
        setError(null); // Reset lỗi nếu có
      } else {
        setError(response.message); // Nếu có lỗi từ API, hiển thị message lỗi
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lấy danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchOrders(); // Gọi API khi page thay đổi
  }, [fetchOrders]);

  // Hàm gọi API khi cuộn xuống gần cuối trang
  const loadMoreOrders = () => {
    if (loading || page >= pagination.totalPages - 1) return; // Nếu đang tải hoặc đã đến trang cuối thì không tải thêm
    setPage((prevPage) => prevPage + 1); // Tăng page lên để tải thêm dữ liệu
  };

  const getOrderByOrderCode = async (orderCode: string) => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await orderService.getOrderByOrderCode(orderCode);
      if (response.success) {
        // Nếu thành công, lưu thông tin đơn hàng vào state
        const order = response.data;
        setOrders((prevOrders) => [...prevOrders, order]); // Cập nhật danh sách đơn hàng (nếu muốn lưu vào danh sách)
        setCurrentOrder(order); // Lưu đơn hàng hiện tại vào state
        console.log("Đơn hàng:", order); // In thông tin đơn hàng ra console hoặc làm gì đó với nó
      } else {
        setError(response.message); // Nếu không thành công, hiển thị lỗi từ API
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi lấy thông tin đơn hàng");
    } finally {
      setLoading(false); // Đã xong việc loading
    }
  };

  // Thêm đơn hàng mới
  const addOrder = async (orderData: OrderRequest) => {
    setLoading(true);
    try {
      const response = await orderService.createOrder(orderData);
      if (response.success) {
        fetchOrders(); // Cập nhật lại danh sách sau khi tạo đơn hàng mới
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tạo đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật đơn hàng
  const updateOrder = async (id: number, orderData: OrderRequest) => {
    setLoading(true);
    try {
      const response = await orderService.updateOrder(id, orderData);
      if (response.success) {
        fetchOrders(); // Cập nhật lại danh sách sau khi cập nhật
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi cập nhật đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (id: number, status: string) => {
    setLoading(true);
    try {
      const response = await orderService.updateOrderStatus(id, status);
      if (response.success) {
        fetchOrders(); // Cập nhật lại danh sách sau khi cập nhật trạng thái
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi cập nhật trạng thái đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // Hủy đơn hàng
  const cancelOrder = async (id: number) => {
    setLoading(true);
    try {
      const response = await orderService.cancelOrder(id);
      if (response.success) {
        fetchOrders(); // Cập nhật lại danh sách sau khi hủy đơn hàng
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi hủy đơn hàng");
    } finally {
      setLoading(false);
    }
  };
  const checkProductDeliveryStatus = useCallback(async (productId: number): Promise<boolean> => {
    // Kiểm tra cache trước
    if (deliveryStatusCache.current[productId] !== undefined) {
      return deliveryStatusCache.current[productId];
    }

    try {
      const response = await orderService.checkProductDelivery(productId);
      const isDelivered = response.success ? response.data : false;
      // Lưu vào cache
      deliveryStatusCache.current[productId] = isDelivered;
      return isDelivered;
    } catch (error) {
      console.error("Error checking delivery status:", error);
      return false;
    }
  }, []);
  // Xóa đơn hàng (admin)
  const deleteOrder = async (id: number) => {
    setLoading(true);
    try {
      const response = await orderService.deleteOrder(id);
      if (response.success) {
        fetchOrders(); // Cập nhật lại danh sách sau khi xóa đơn hàng
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi xóa đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    currentOrder,
    getOrderByOrderCode,
    checkProductDeliveryStatus,
    loadMoreOrders,
    addOrder,
    updateOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    setPage, // Hàm để thay đổi trang (page)
    pagination, // Trả về thông tin phân trang
  };
};
