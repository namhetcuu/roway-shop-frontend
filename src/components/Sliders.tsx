"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";

// Import CSS của slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BannerSlider() {
  // Cấu hình cho react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full h-h-full overflow-hidden"> {/* Giới hạn chiều cao */}
      <Slider {...settings}>
        {["/banner1.jpg", "/banner1.jpg", "/banner1.jpg"].map((src, index) => (
          <div key={index} className="relative w-full flex justify-center items-center">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width={1920} // Đặt kích thước lớn để tránh bị mờ
              height={500}
              className="object-contain h-auto w-full" // Không crop ảnh
              priority={index === 0}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
