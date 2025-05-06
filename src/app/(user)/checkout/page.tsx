"use client";
import AddressSelection from "./components/AddressSelection";
import PaymentMethods from "./components/PaymentMethods";
import OrderSummary from "./components/OrderSummary";

const Page = () => {

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-lg w-full">
        {/* Cột địa chỉ + phương thức thanh toán */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <AddressSelection  />
          <PaymentMethods />
        </div>

        {/* Cột tóm tắt đơn hàng */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Page;
