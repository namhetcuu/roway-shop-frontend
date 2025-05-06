import React from "react";
import { FiPackage, FiDollarSign } from "react-icons/fi";

const OrderStatus = ({ totalOrders, totalSpent }: { totalOrders: number; totalSpent: string }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <FiPackage size={16} />
          <span className="text-sm">Tổng đơn hàng</span>
        </div>
        <p className="font-bold text-xl">{totalOrders}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <FiDollarSign size={16} />
          <span className="text-sm">Tổng chi tiêu</span>
        </div>
        <p className="font-bold text-xl">{totalSpent}</p>
      </div>
    </div>
  );
};

export default OrderStatus;
