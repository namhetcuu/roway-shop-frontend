import { useState, useEffect } from "react";
import { FiStar, FiChevronDown, FiImage, FiEdit2, FiTrash2, FiPlus, FiUser, FiClock, FiTruck } from "react-icons/fi";
import { format, differenceInDays } from 'date-fns';
import { useProductReviews } from "@/hooks/products/useProductReview";
import Image from 'next/image';
interface ProductReviewsProps {
  productId: number;
  isOrderDelivered: boolean;
}
const ReviewsProduct = ({ productId, isOrderDelivered }: ProductReviewsProps) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    content: "",
    images: [] as File[],
  });

  const {
    reviews,
    loading,
    error,
    fetchReviewsByProduct,
    addOrUpdateReview,
    removeReview,
  } = useProductReviews();


  // Lấy danh sách đánh giá khi component mount hoặc productId thay đổi
  useEffect(() => {
    fetchReviewsByProduct(productId);
  }, [productId, fetchReviewsByProduct]);

  const filteredReviews = activeFilter
    ? reviews?.filter(review => review.rating === activeFilter) || []
    : reviews || [];

  const averageRating = (reviews ?? []).reduce((sum, review) => sum + review.rating, 0) / ((reviews ?? []).length || 1);

  // Kiểm tra xem đánh giá có thể chỉnh sửa (trong vòng 30 ngày)
  const canEditReview = (createdAt: string) => {
    return differenceInDays(new Date(), new Date(createdAt)) <= 30;
  };

  const StarRating = ({ rating, size = 'md' }: { rating: number, size?: 'sm' | 'md' | 'lg' }) => {
    const starSize = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }[size];

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`${starSize} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        {size !== 'sm' && (
          <span className="ml-1 text-gray-600 text-sm">{rating.toFixed(1)}</span>
        )}
      </div>
    );
  };

  const handleSubmitReview = () => {
    addOrUpdateReview({
      productId,
      rating: newReview.rating,
      reviewText: newReview.content,
      imageFiles: newReview.images,
    });
    setIsWritingReview(false);
    setNewReview({ rating: 5, content: "", images: [] });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đánh giá sản phẩm</h1>
          <div className="flex items-center mt-2">
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <span className="ml-2 text-gray-600">
              ({filteredReviews.length} đánh giá)
            </span>
          </div>
        </div>
        {/* Chỉ hiển thị nút viết đánh giá nếu đơn hàng đã giao */}
        {isOrderDelivered && (
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <select
                className="appearance-none w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                value={activeFilter || ""}
                onChange={(e) => setActiveFilter(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Tất cả đánh giá</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>
              <FiChevronDown className="absolute right-2 top-2.5 text-gray-400" />
            </div>

            <button
              onClick={() => setIsWritingReview(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
            >
              <FiPlus className="w-4 h-4" />
              Viết đánh giá
            </button>
          </div>
        )}
      </div>
      {/* Thông báo nếu đơn hàng chưa giao */}
      {!isOrderDelivered && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded flex items-start gap-3">
          <FiTruck className="text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-700 font-medium">Bạn chưa thể đánh giá sản phẩm này</p>
            <p className="text-blue-600 text-sm mt-1">
              Chỉ có thể đánh giá sản phẩm sau khi đơn hàng đã được giao thành công
            </p>
          </div>
        </div>
      )}

      {/* Review Form */}
      {isWritingReview && (
        <div className="bg-white rounded-lg p-5 mb-6 border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Viết đánh giá của bạn</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="p-1 focus:outline-none"
                  >
                    <FiStar
                      className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung đánh giá</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm min-h-[100px]"
                placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh (tối đa 3)</label>
              <div className="flex gap-3">
                {newReview.images.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      width={64} // Đảm bảo set width và height
                      height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      onClick={() => setNewReview({
                        ...newReview,
                        images: newReview.images.filter((_, i) => i !== index)
                      })}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                ))}

                {newReview.images.length < 3 && (
                  <label className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 cursor-pointer">
                    <FiImage className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        if (newReview.images.length + files.length > 3) return; // giới hạn 3 ảnh

                        setNewReview((prev) => ({
                          ...prev,
                          images: [...prev.images, ...files],
                        }));
                      }}
                    />
                  </label>
                )}

              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsWritingReview(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmitReview}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm"
                disabled={!newReview.content.trim() || loading}
              >
                {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-5">
        {loading && filteredReviews.length === 0 ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
            <FiStar className="mx-auto text-gray-300 w-10 h-10 mb-3" />
            <h3 className="text-base font-medium text-gray-900">Chưa có đánh giá nào</h3>
            <p className="text-gray-500 mt-1 mb-4 text-sm">Hãy là người đầu tiên đánh giá sản phẩm này</p>
          </div>
        ) : (
          filteredReviews.map((review) => {
            const editable = canEditReview(review.createdAt);
            return (
              <div
                key={review.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {review.userName ? (
                      <span className="font-medium text-gray-700">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <FiUser className="text-gray-500 w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {review.userName || "Khách hàng"}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-xs text-gray-500">
                            {format(new Date(review.createdAt), 'dd/MM/yyyy')}
                          </span>
                          {!editable && (
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <FiClock size={12} /> Hết hạn chỉnh sửa
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className={`text-gray-700 text-sm ${expandedReviewId !== review.id && review.reviewText.length > 120 ? 'line-clamp-3' : ''}`}>
                        {review.reviewText}
                      </p>
                      {review.reviewText.length > 120 && (
                        <button
                          onClick={() => setExpandedReviewId(expandedReviewId === review.id ? null : review.id)}
                          className="text-blue-600 text-xs mt-1 hover:underline"
                        >
                          {expandedReviewId === review.id ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                      )}
                    </div>

                    {review.imageUrl && (
                      <div className="mt-3 flex gap-3">
                        <Image
                          src={review.imageUrl} // Đảm bảo review.imageUrl là một URL hợp lệ
                          alt="Review"
                          width={64} // Chiều rộng cho ảnh
                          height={64} // Chiều cao cho ảnh
                          className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                        />
                      </div>
                    )}

                    <div className="flex gap-4 mt-3 pt-3 border-t border-gray-100">
                      {editable && (
                        <>
                          <button
                            onClick={() => {
                              setNewReview({
                                rating: review.rating,
                                content: review.reviewText,
                                images: [] // Ensure images is always an empty File[] as review.imageUrl is a string
                              });
                              setIsWritingReview(true);
                            }}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FiEdit2 className="w-3 h-3" /> Chỉnh sửa
                          </button>
                          <button
                            onClick={() => removeReview(review.id)}
                            className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                          >
                            <FiTrash2 className="w-3 h-3" /> Xóa
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReviewsProduct;