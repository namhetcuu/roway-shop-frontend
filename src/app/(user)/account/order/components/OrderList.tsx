import React from "react";
import OrderCard from "./OrderCard";
import Image from "next/image";
import { OrderResponse } from "types/order/order-response.type";

const OrderList = ({ orders }: { orders: OrderResponse[] }) => {
  return (
    <div className="space-y-4">
      {/* Nếu không có đơn hàng, hiển thị hình ảnh thông báo không có đơn hàng */}
      {orders.length === 0 ? (
        <Image
          className="block mx-auto mt-4"
          src="/images/not-found-order1.png"
          alt="Không có đơn hàng"
          width={300}
          height={200}
        />
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)  
      )}
    </div>
  );
};

export default OrderList;
