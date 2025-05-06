"use client"; // Đánh dấu đây là component client-side

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Để điều hướng sau khi đăng ký thành công
import useAuth from "@/hooks/auth/useAuth"; // Import hook useAuth

// Khai báo kiểu dữ liệu cho các state và lỗi
export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { handleRegister } = useAuth(); // Truy cập phương thức handleRegister từ useAuth

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      // Sử dụng hàm handleRegister từ useAuth để đăng ký người dùng
      await handleRegister(username, password, email);

      // Sau khi đăng ký thành công, điều hướng đến trang đăng nhập
      router.push("/sign-in");
    } catch (err) {
      // Hiển thị lỗi nếu có
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.";
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center items-center bg-gray-100 p-10 min-h-screen">
      <section className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="text-4xl font-semibold text-center text-gray-700">
          ROWAY
        </div>
        <div>
          <h1 className="font-bold text-2xl text-gray-700 mb-4">
            Tạo một tài khoản
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-600"
              >
                Địa chỉ email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email của bạn"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Username input */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-600"
              >
                Tên người dùng
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên người dùng"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password input */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password input */}
            <div className="flex flex-col">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-600"
              >
                Nhập lại mật khẩu
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                className="mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" Nhập lại mật khẩu"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>

            {/* Error message */}
            {error && <div className="text-red-500 text-sm mt-3">{error}</div>}
          </form>

          {/* Link to login */}
          <div className="mt-4 text-center text-sm text-gray-600">
           Bạn đã có tài khoản?{" "}
            <a href="/sign-in" className="text-blue-500 hover:underline">
              Đăng nhập ngay
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
