import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SuccessModalProps } from "types/type";

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen }) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full text-center mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <CheckCircleIcon size={60} className="text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl font-semibold text-gray-800">Thanh toán thành công!</h2>
        <p className="text-gray-600 mt-2">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessModal;
