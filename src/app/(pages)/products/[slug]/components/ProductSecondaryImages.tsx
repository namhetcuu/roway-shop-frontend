import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSecondaryImagesProps {
  secondaryImageUrls: string[];
  selectedImage: string;
  setSelectedImage: (imageUrl: string) => void;
}

const ProductSecondaryImages: React.FC<ProductSecondaryImagesProps> = ({
  secondaryImageUrls,
  selectedImage,
  setSelectedImage,
}) => {
  const defaultImage = "/default-image.jpg";
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const maxVisibleImages = 4;

  // Xử lý cuộn trên desktop
  const scrollDesktop = (direction: "up" | "down") => {
    if (!containerRef.current) return;
    
    const newIndex = direction === "down" 
      ? Math.min(visibleStartIndex + 1, secondaryImageUrls.length - maxVisibleImages)
      : Math.max(visibleStartIndex - 1, 0);
    
    setVisibleStartIndex(newIndex);
    
    // Cuộn mượt
    const scrollAmount = direction === "down" ? 88 : -88; // 80px height + 8px gap
    containerRef.current.scrollBy({ top: scrollAmount, behavior: "smooth" });
  };

  // Xử lý cuộn trên mobile
  const scrollMobile = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    
    const scrollAmount = direction === "right" ? 88 : -88; // 80px width + 8px gap
    containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const visibleImages = secondaryImageUrls.length > maxVisibleImages 
    ? secondaryImageUrls.slice(visibleStartIndex, visibleStartIndex + maxVisibleImages)
    : secondaryImageUrls;

  return (
    <div className="relative">
      {/* Desktop view - vertical scroll with buttons */}
      <div className="hidden md:flex flex-col items-center">
        {secondaryImageUrls.length > maxVisibleImages && visibleStartIndex > 0 && (
          <button 
            onClick={() => scrollDesktop("up")}
            className="mb-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
            aria-label="Scroll up"
          >
            <ChevronUp size={20} />
          </button>
        )}

        <div 
          ref={containerRef}
          className="flex flex-col gap-2  h-[calc(80px*4+8px*3)]" // 4 images + gaps
        >
          {visibleImages.map((thumb, index) => (
            <Image
              key={index}
              src={typeof thumb === "string" ? thumb : defaultImage}
              alt={`Thumbnail ${index}`}
              width={80}
              height={80}
              className={`rounded-lg cursor-pointer border-2 ${
                selectedImage === thumb
                  ? "border-black scale-105"
                  : "border-gray-300"
              } hover:border-black transition transform`}
              onClick={() => setSelectedImage(thumb)}
            />
          ))}
        </div>

        {secondaryImageUrls.length > maxVisibleImages && 
          visibleStartIndex < secondaryImageUrls.length - maxVisibleImages && (
            <button 
              onClick={() => scrollDesktop("down")}
              className="mt-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
              aria-label="Scroll down"
            >
              <ChevronDown size={20} />
            </button>
          )}
      </div>

      {/* Mobile view - horizontal scroll with buttons */}
      <div className="md:hidden flex items-center relative">
        {secondaryImageUrls.length > 0 && (
          <>
            <button 
              onClick={() => scrollMobile("left")}
              className="absolute left-0 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            <div 
              ref={containerRef}
              className="flex gap-2 overflow-x-auto py-2 px-8 scrollbar-hide" // Thêm padding để không bị che bởi nút
            >
              {secondaryImageUrls.map((thumb, index) => (
                <Image
                  key={index}
                  src={typeof thumb === "string" ? thumb : defaultImage}
                  alt={`Thumbnail ${index}`}
                  width={80}
                  height={80}
                  className={`flex-shrink-0 rounded-lg cursor-pointer border-2 ${
                    selectedImage === thumb
                      ? "border-black scale-105"
                      : "border-gray-300"
                  } hover:border-black transition transform`}
                  onClick={() => setSelectedImage(thumb)}
                />
              ))}
            </div>

            <button 
              onClick={() => scrollMobile("right")}
              className="absolute right-0 z-10 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Fallback khi không có ảnh */}
      {secondaryImageUrls.length === 0 && (
        <Image
          src={defaultImage}
          alt="No Image"
          width={80}
          height={80}
          className="rounded-md border border-gray-300"
        />
      )}
    </div>
  );
};

export default ProductSecondaryImages;