import { motion } from "framer-motion";
import { XCircleIcon } from "lucide-react";
import { ConfirmationModalProps } from "types/type";


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, address, paymentMethod, total }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Nút đóng */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition">
                    <XCircleIcon size={24} />
                </button>

                <h2 className="text-xl font-semibold text-gray-800 text-center">Xác nhận đặt hàng</h2>
                <p className="text-center font-bold text-2xl mb-4">ROWAY</p>
                <p className="text-gray-600 text-center mb-4">Bạn có chắc chắn muốn đặt hàng với thông tin sau?</p>

                <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-sm">
                    <p><span className="font-medium text-">📍 Địa chỉ giao hàng:</span> {address}</p>
                    <p><span className="font-medium">💳 Phương thức thanh toán:</span> {paymentMethod}</p>
                    <p className="font-medium">💰 Tổng thanh toán:<span className="text-2xl font-bold "> {total.toLocaleString()}₫</span></p>
                </div>

                <div className="flex justify-center space-x-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-200 transition"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-full py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    >
                        Xác nhận đặt hàng
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmationModal;
