"use client";
import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";
import { useUser } from "@/hooks/users/useUser";

export default function ChangePasswordTab() {
  const { changePassword, loading } = useUser();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Toggle hiển thị mật khẩu
  const toggleShowPassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.dismiss(); // Xóa các toast trước đó để tránh trùng lặp thông báo

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận không khớp!", { position: "top-right" });
      return;
    }
    if (form.newPassword.length < 6) {
      toast.warning("Mật khẩu mới phải có ít nhất 6 ký tự!", { position: "top-right" });
      return;
    }

    try {
      const success = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      if (success) {
        toast.success("Đổi mật khẩu thành công!", { position: "top-right" });
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset form sau khi đổi mật khẩu thành công
      } else {
        toast.error("Mật khẩu cũ không đúng hoặc có lỗi xảy ra!", { position: "top-right" });
      }
    } catch {
      toast.error("Lỗi hệ thống. Vui lòng thử lại!", { position: "top-right" });
    }
  };

  return (
    <div className="">
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">Đổi mật khẩu</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {["oldPassword", "newPassword", "confirmPassword"].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-2">
              {field === "oldPassword"
                ? "Mật khẩu hiện tại"
                : field === "newPassword"
                ? "Mật khẩu mới"
                : "Xác nhận mật khẩu"}
            </label>
            <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 ring-blue-500 transition-all">
              <input
                type={showPasswords[field as keyof typeof showPasswords] ? "text" : "password"}
                name={field}
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-800 focus:outline-none bg-transparent"
                required
              />
              <button
                type="button"
                onClick={() => toggleShowPassword(field as keyof typeof showPasswords)}
                className="absolute right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPasswords[field as keyof typeof showPasswords] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white rounded-lg font-medium transition-all  ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800 transition-colors"
          }`}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
