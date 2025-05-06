import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardIcon, CheckIcon } from "lucide-react";
import { useDiscounts } from "@/hooks/discount/useDiscount";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { applyVoucher } from "@/redux/slices/voucherSlice";
import { Voucher } from "types/type";

const VoucherList: React.FC = () => {
  const dispatch = useDispatch();
  const [inputCode, setInputCode] = useState("");
  const [message, setMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const selectedVoucher = useSelector((state: RootState) => state.voucher.selectedVoucher);

  // ✅ Hook để lấy danh sách voucher của user
  const { userDiscountCodes, fetchUserDiscountCodes, saveDiscountCode, loading, error } = useDiscounts();

  useEffect(() => {
    fetchUserDiscountCodes();
  }, [fetchUserDiscountCodes]);

  const handleSaveDiscount = async (code: string) => {
    setMessage("");
    try {
      await saveDiscountCode(code);
      await fetchUserDiscountCodes(); // Cập nhật danh sách mã của user
      setMessage("Mã giảm giá đã được lưu!");
    } catch {
      setMessage("Mã giảm giá không hợp lệ.");
    }
  };

  const handleSelectVoucher = (voucher: Voucher) => {
    dispatch(applyVoucher(voucher)); // ✅ Lưu voucher vào Redux
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Ô nhập mã giảm giá */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="border border-gray-300 p-2 rounded w-3/4 sm:w-full"
        />
        <button
          onClick={() => handleSaveDiscount(inputCode)} // ✅ Sử dụng inputCode
          className="bg-gray-800 text-xs text-white px-4 py-[10px] rounded hover:bg-gray-700"
        >
          Áp dụng
        </button>
      </div>

      {message && <p className="text-sm text-center">{message}</p>}

      {/* Hiển thị lỗi nếu có */}
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {/* Danh sách mã giảm giá */}
      {loading ? (
        <p className="text-gray-500 text-sm text-center">Đang tải...</p>
      ) : userDiscountCodes?.length ? (
        userDiscountCodes.map((voucher) => (
          <motion.div
            key={voucher.code}
            className={`flex rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer shadow-sm
            ${selectedVoucher?.code === voucher.code ? "border-blue-600 bg-blue-100 shadow-md scale-100" : "border-gray-200 bg-white"}`}
            onClick={() => handleSelectVoucher(voucher)}
          >
            {/* Phần thông tin giảm giá */}
            <div className="flex-none w-26 bg-gradient-to-br from-blue-600 to-blue-700 text-white flex flex-col items-center justify-center p-4">
              <span className="font-bold text-xl text-yellow-200">ROWAY</span>
              <span className="text-xl font-bold">
                {voucher.discountType === "PERCENTAGE"
                  ? `${voucher.discountAmount}%`
                  : `${voucher.discountAmount.toLocaleString()}₫`}
              </span>
              {voucher.maxDiscountAmount && (
                <span className="text-xs mt-1">Lên tới {voucher.maxDiscountAmount.toLocaleString()}₫</span>
              )}
            </div>

            {/* Phần thông tin chi tiết */}
            <div className="flex-1 bg-white p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-900 text-lg">{voucher.code}</span>
                <button onClick={() => handleCopy(voucher.code)} className="text-blue-600 hover:text-blue-700 transition-colors">
                  {copied ? <CheckIcon size={18} /> : <ClipboardIcon size={18} />}
                </button>
              </div>

              <div className="text-sm text-green-600 flex items-center font-medium">
                <CheckIcon size={14} className="mr-1" /> {selectedVoucher?.code === voucher.code ? "Đã chọn" : "Có sẵn"}
              </div>

              <div className="text-xs text-gray-600 font-medium">
                HSD: {new Date(voucher.expiryDate).toLocaleDateString()}
              </div>

              {voucher.minOrderValue > 0 && (
                <div className="text-xs text-gray-600 font-medium">
                  Đơn hàng từ: {voucher.minOrderValue.toLocaleString()}₫
                </div>
              )}

            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">Bạn chưa có mã giảm giá nào.</p>
      )}
    </div>
  );
};

export default VoucherList;
