import { useState } from "react";
import Image from 'next/image';

const ProductImageZoom: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const zoomScale = 2.5; 

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="relative border border-gray-300 overflow-hidden rounded-xl cursor-crosshair"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={imageUrl || "/default-image.jpg"}
        alt="Product"
        width={600}
        height={600}
        className="object-cover transition-opacity duration-300 group-hover:opacity-60"
        onError={(e) => ((e.currentTarget.src = "/default-image.jpg"))}
        placeholder="blur"
        blurDataURL="/default-image.jpg"
      />

      {/* Hiệu ứng phóng to đè lên ảnh chính */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-300"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: "scale(1.05)",
            filter: "brightness(1.2) contrast(1.1)"
          }}
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
