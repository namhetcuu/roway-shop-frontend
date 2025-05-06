import Image from 'next/image';


export default function Description() {
  return (
    <div className="additional-info tab-content space-y-5">
      <p className="font-semibold text-lg text-gray-800">
        Chi tiết áo sơ mi Roway
      </p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Chất vải: Lụa pha thoáng mát, mềm mịn</li>
        <li>Phom áo: Suông che khuyết điểm tốt và dễ dàng hoạt động</li>
        <li>Hoàn thiện: tỉ mỉ cao</li>
      </ul>
      <p className="font-semibold text-gray-800">
        Cách chọn size: Bạn nên Inbox, cung cấp chiều cao, cân nặng để shop tư
        vấn size chuẩn nhất
      </p>
      <div>
        <p className="font-semibold text-gray-800">Bảng size mẫu Roway</p>
        <Image
          className="rounded-md border border-gray-300 w-full h-auto"
          src="https://down-vn.img.susercontent.com/file/7bcd9ed9ed781eba25b96371424cf228"
          alt="Size chart"
          width={500} // Cung cấp kích thước thực tế của ảnh (thay đổi tùy theo kích thước ảnh)
          height={300} // Thay đổi theo tỉ lệ ảnh thực tế
          layout="intrinsic" // Thay đổi cách ảnh hiển thị mà không cần set width, height cụ thể
        />

      </div>
      <p className="font-semibold text-gray-800">
        Sản phẩm được đóng 2 lớp hộp để chống móp méo khi vận chuyển
      </p>
      <p className="font-semibold text-gray-800">
        Là khách hàng Roway, chúng tôi cam kết bạn sẽ được:
      </p>
      <ul className="list-decimal pl-5 space-y-2 text-gray-600">
        <li>Sản phẩm giống mô tả và hình ảnh thật 100%</li>
        <li>Đảm bảo vải chất lượng sản phẩm 100%</li>
        <li>Cam kết được đổi trả hàng trong vòng 30 ngày</li>
        <li>
          Hoàn tiền nếu sản phẩm không giống với mô tả (hàng còn nguyên vẹn,
          chưa qua sử dụng)
        </li>
      </ul>
      <p className="font-semibold text-gray-800">Hướng dẫn sử dụng:</p>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li>Giặt ở nhiệt độ bình thường</li>
        <li>Không được dùng hóa chất tẩy</li>
      </ul>
    </div>
  );
}
