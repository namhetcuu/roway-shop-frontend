"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/users/useUser";

export default function ProfileTab() {
  const { user, loading, fetchCurrentUser, updateUserInfo } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  // 🔄 Fetch user khi component mount
  useEffect(() => {
    fetchCurrentUser().catch(() => {
      toast.error("Lỗi khi tải thông tin người dùng!");
    });
  }, [fetchCurrentUser]);

  // 🔄 Sync user data vào form
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  // 🔁 Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📨 Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await updateUserInfo(formData);
    if (success) {
      toast.success("Cập nhật thông tin thành công!");
      fetchCurrentUser();
    } else {
      toast.error("Cập nhật thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold text-gray-800 mb-4">
        Thông tin cá nhân
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Họ & tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Username (disabled) */}
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="username"
          >
            Tên người dùng
          </label>
          <input
            id="username"
            type="text"
            value={user?.username || ""}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
            disabled
          />
        </div>
        {/* Email (disabled) */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ""}
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
            disabled
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="bio">
            Tiểu sử
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md h-24 resize-none"
            placeholder="Giới thiệu ngắn về bạn..."
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="text-white px-6 py-2 rounded-md bg-black hover:bg-gray-800 transition-colors"
          disabled={loading}
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </form>
    </div>
  );
}
