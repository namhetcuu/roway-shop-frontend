"use client";

import React from "react";

const ComfortFeature: React.FC = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center w-full justify-center max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-12 gap-8">
      {/* Left Section - Video */}
      <div className="relative w-full lg:w-1/2">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full rounded-lg object-cover shadow-xl"
        />
      </div>

      {/* Right Section - Content */}
      <div className="w-full lg:w-1/2 space-y-5 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">
          Khám Phá Phong Cách Cùng Roway
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Thời trang không chỉ là quần áo, mà còn là cách bạn thể hiện bản thân. Cùng
          Roway khám phá những thiết kế độc đáo, tinh tế và luôn dẫn đầu xu hướng.
          Hãy tự tin tỏa sáng với phong cách của riêng bạn!
        </p>

        {/* Danh sách ưu điểm */}
        <ul className="space-y-4">
          {["Chất liệu cao cấp", "Thiết kế hiện đại", "Thoải mái khi mặc"].map(
            (text, index) => (
              <li key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
                <span className="text-gray-700 font-medium">{text}</span>
              </li>
            )
          )}
        </ul>

        {/* Nút Mua Ngay */}
        <div className="flex justify-center lg:justify-start">
          <button className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
            Mua Ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComfortFeature;
