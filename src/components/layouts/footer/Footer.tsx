import React from 'react'
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from 'lucide-react'
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">ROWAY</h3>
            <p className="text-gray-400 mb-4">
              Thương hiệu thời trang nam cao cấp với phong cách hiện đại, trẻ
              trung và lịch lãm.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-300">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="hover:text-gray-300">
                <YoutubeIcon size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Danh mục</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Áo
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Quần
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Phụ kiện
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Bộ sưu tập mới
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Khuyến mãi
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách đổi trả
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Liên hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPinIcon size={20} className="text-gray-400 shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Đường ABC, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon size={20} className="text-gray-400" />
                <span className="text-gray-400">0123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon size={20} className="text-gray-400" />
                <span className="text-gray-400">contact@roway.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6">
          <p className="text-gray-500 text-center">
            © 2025 ROWAY. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
