"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FeedbackTab() {
  const router = useRouter();

  return (
    <div >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-4">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-lg font-semibold flex-1 text-center mr-8">
            GÓP Ý VÀ PHẢN HỒI
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center bg-blue-50 rounded-lg p-4 mb-6">
          <div className="mr-4">
            <Image
              src="https://static-smember.cellphones.com.vn/smember/_nuxt/img/1024-15361.644ed9e.png"
              alt="Feedback illustration"
              width={80}
              height={80}
              className="w-20 h-20 object-contain"
            />
          </div>
          <p className="text-gray-700">
            Mời bạn đánh giá mức độ hài lòng về chương trình ưu đãi Smember của
            CellphoneS. Hãy cho chúng mình thêm góp ý để cải thiện tốt hơn
          </p>
        </div>

        {/* Feedback Form */}
        <div className="rounded-lg overflow-hidden shadow-sm border">
          <iframe
            title="Feedback Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSc0VgpzoRt8XvE4GKN8ahzNRamXn1aayoRE0TggpNPo34XJcQ/viewform?embedded=true"
            className="w-full h-[600px]"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
          >
            Đang tải...
          </iframe>
        </div>
      </div>
    </div>
  );
}