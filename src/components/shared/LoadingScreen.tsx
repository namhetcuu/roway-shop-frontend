// components/LoadingScreen.tsx
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinner với gradient */}
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Đang tải ROWAY...
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
