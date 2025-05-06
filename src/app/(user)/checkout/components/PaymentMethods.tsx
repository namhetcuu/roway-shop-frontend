"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaMoneyBillWave, FaQrcode } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { setPaymentMethod } from "@/redux/slices/paymentSlice";

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const paymentMethod = useSelector((state: RootState) => state.payment.selectedMethod);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mt-6 text-gray-700">Phương thức thanh toán</h3>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <FaMoneyBillWave className="text-green-500 text-xl" />
        <input type="radio" name="paymentMethod" value="COD" checked={paymentMethod === "COD"} onChange={() => dispatch(setPaymentMethod("COD"))} />
        <span>Thanh toán khi giao hàng (COD)</span>
      </label>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <FaQrcode className="text-indigo-500 text-xl" />
        <input type="radio" name="paymentMethod" value="VietQR" checked={paymentMethod === "VIETQR"} onChange={() => dispatch(setPaymentMethod("VIETQR"))} />
        <span>Thanh toán qua VietQR</span>
      </label>
      <label className="flex items-center space-x-2 border p-3 rounded-lg cursor-pointer hover:bg-gray-100">
        <MdPayment className="text-indigo-500 text-xl" />
        <input type="radio" name="paymentMethod" value="VNPay" checked={paymentMethod === "VNPAY"} onChange={() => dispatch(setPaymentMethod("VNPAY"))} />
        <span>Thanh toán qua VNPay</span>
      </label>
    </div>
  );
};

export default PaymentMethods;
