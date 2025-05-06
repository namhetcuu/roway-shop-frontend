import SkeletonSkeleton from "@/components/orders/SupportSkeleton";
import { useSupportItems } from "@/hooks/support/useSupport";
import Image from "next/image";
import Link from "next/link";

export default function HelpTab() {
    const { supportItems, loading } = useSupportItems();  // Lấy dữ liệu từ hook

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Hỗ trợ khách hàng</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-200"
                        >
                            <SkeletonSkeleton /> {/* Sử dụng SkeletonSkeleton khi đang tải */}
                        </div>
                    ))
                    : supportItems.map((item, index) => {
                        const imgSrc = item.img;
                        return (
                            <div
                                key={index}
                                className="p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                style={{ backgroundColor: item.bgColor }} // Áp dụng màu nền từ API
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-white shadow-xs">
                                        <Image
                                            src={imgSrc} // Hiển thị ảnh từ URL
                                            alt={item.title}
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 object-contain"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{item.hours}</p>
                                        <a
                                            href={item.link || '#'} // Kiểm tra nếu không có link
                                            className="inline-block mt-1 px-3 py-1.5 bg-white rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                                        >
                                            {item.contact || 'Liên hệ'} {/* Xử lý trường hợp không có contact */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Hỗ trợ trực tuyến</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Link
                        href="https://zalo.me/your_zalo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-blue-100 text-blue-700 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                        <Image
                            src="/icons/icon_of_zalo.png"
                            alt="Zalo"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <span>Zalo</span>
                    </Link>

                    <Link
                        href="https://www.facebook.com/messages/e2ee/t/6506988999404944"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <Image
                            src="/icons/icon_of_mess.png"
                            alt="Messenger"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <span>Messenger</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
