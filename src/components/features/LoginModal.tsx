// components/shared/LoginModal.tsx
"use client";

import { useRouter } from "next/navigation";
import { XIcon, LogInIcon } from "lucide-react"; // Thêm các icon cần thiết

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  title?: string;
}

const LoginModal = ({ 
  isOpen, 
  onClose, 
  message = "Bạn cần đăng nhập để thực hiện thao tác này.",
  title = "Yêu cầu đăng nhập"
}: LoginModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Đóng modal"
          >
            <XIcon size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-gray-700">{message}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Đóng
          </button>
          <button
            onClick={() => router.push("/sign-in")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all font-medium flex items-center"
          >
            <LogInIcon className="mr-2" size={18} />
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;