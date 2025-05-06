"use client";

import React, { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@nextui-org/react";
import useAuth from "@/hooks/auth/useAuth";
import GoogleLoginButton from "@/components/shared/GoogleLoginButton";

interface LoginResponse {
  token: string;
}

export default function LoginPage() {
  const { handleLogin, loading, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [localError, setLocalError] = useState<string>("");
  const router = useRouter();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { username, password } = formData;
    
    // Form validation
    if (!username || !password) {
      setLocalError("Please enter both username and password.");
      return;
    }
    
    setLocalError("");
    
    try {
      const response: LoginResponse | void = await handleLogin(username, password);
      
      if (response?.token) {
        router.push("/");
      } else {
        setLocalError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setLocalError("Login failed. Please try again.");
    }
  };

  const error = localError || authError;

  return (
    <main className="w-full flex justify-center items-center bg-gray-100 p-10 min-h-screen">
      <section className="flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          ROWAY
        </h1>
        
        {/* Google Login Button */}
        <GoogleLoginButton />

        <div className="relative flex items-center">
          <span className="w-full h-[1px] bg-gray-300"></span>
          <span className="px-3 text-sm text-gray-500 bg-white absolute left-1/2 transform -translate-x-1/2">
            OR
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center gap-2 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size="sm" className="text-white" />
            ) : (
              "Login"
            )}
          </button>

          {/* Error message display */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
        </form>

        <p className="text-sm text-gray-600 text-center">
          Không có tài khoản?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </section>
    </main>
  );
}