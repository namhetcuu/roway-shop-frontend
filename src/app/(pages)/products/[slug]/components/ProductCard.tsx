import { useState } from "react";
import ProductImageZoom from "@/components/features/ProductImageZoom";
import { useCart } from "@/hooks/cart/useCart";
import { FacebookIcon, ShareIcon, ShoppingBagIcon, TruckIcon, TwitterIcon } from "lucide-react";
import { ProductCardProps } from "types/type";
import { SizeProductResponse, VariantResponse } from "types/product/product-response.types";
import { CartRequest } from "types/cart/cart-request.type";
import useAuth from "@/hooks/auth/useAuth";
import LoginModal from "@/components/features/LoginModal";
import ProductSecondaryImages from "./ProductSecondaryImages";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("Product", product)
  const { addItemToCart, loading } = useCart();
  const { token } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const defaultImage = "/default-image.jpg";
  const initialVariant = product.variants[0] || null;
  const [selectedVariant, setSelectedVariant] = useState<VariantResponse | null>(initialVariant);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<SizeProductResponse | null>(null);
  const [selectedImage, setSelectedImage] = useState(selectedVariant?.imageUrl || product.mainImageUrl || defaultImage);

  if (!product) return <p className="text-center text-red-500">Dữ liệu sản phẩm không khả dụng.</p>;

  const allColors = product.variants.map((variant) => variant.color);
  const availableSizes = selectedVariant?.sizes || [];
  const allTags = product.tags || [];
  const lowestPrice = availableSizes.length
    ? Math.min(...availableSizes.map((size) => size.priceAfterDiscount ?? size.price))
    : 0;
  const originalPrice = availableSizes.length
    ? Math.min(...availableSizes.map((size) => size.price))
    : 0;

  const handleColorChange = (color: string) => {
    const variant = product.variants.find((v) => v.color === color);
    if (variant) {
      setSelectedVariant(variant);
      setSelectedSize(null);
      setSelectedImage(variant.imageUrl || product.mainImageUrl || defaultImage);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedVariant || !selectedSize) {
      alert("Vui lòng chọn màu sắc và kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    const cartRequest: CartRequest = {
      items: [
        {
          productId: product.id,
          quantity: quantity,
          sizeName: selectedSize.sizeName,
          color: selectedVariant.color,
        },
      ],
    };

    await addItemToCart(cartRequest);
  };

  const handleQuantityChange = (change: number) => {
    if (!selectedSize) return;
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= selectedSize.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white p-6 max-w-6xl mx-auto gap-x-3">
      {/* Ảnh phụ (Sidebar) */}
      <ProductSecondaryImages
        secondaryImageUrls={product.secondaryImageUrls || []}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {/* Ảnh chính */}
      <div className="w-full md:w-1/2">
        <ProductImageZoom imageUrl={typeof selectedImage === 'string' ? selectedImage : defaultImage} />
      </div>

      {/* Mô tả sản phẩm */}
      <div className="w-full md:w-2/5 md:ml-7 space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-gray-600 text-sm">{product.shortDescription ?? "Mô tả đang cập nhật..."}</p>

        {/* Giá sản phẩm */}
        <div className="mt-2 text-lg font-semibold">
          {selectedSize ? (
            <>
              <span className="text-red-500 text-xl font-bold">
                {selectedSize.priceAfterDiscount?.toLocaleString("vi-VN")}₫
              </span>
              {selectedSize.priceAfterDiscount !== selectedSize.price && (
                <span className="line-through text-gray-500 ml-2">
                  {selectedSize.price.toLocaleString("vi-VN")}₫
                </span>
              )}
            </>
          ) : (
            <>
              <span className="text-red-500 text-xl font-bold">
                {lowestPrice.toLocaleString("vi-VN")}₫
              </span>
              {lowestPrice !== originalPrice && (
                <span className="line-through text-gray-500 ml-2">
                  {originalPrice.toLocaleString("vi-VN")}₫
                </span>
              )}
            </>
          )}
          <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
            {product.salePercentage}% Giảm
          </span>
        </div>

        {/* Hiển thị danh sách tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Chọn màu */}
        <div className="space-y-2 ">
          <h3 className="text-sm font-medium text-gray-900">Màu sắc: <span className="font-semibold">{selectedVariant?.color}</span></h3>
          <div className="flex gap-2">
            {allColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleColorChange(color)}
                className={`w-8 h-8 rounded-full transition-all ${selectedVariant?.color === color
                  ? "ring-2 ring-offset-2 ring-blue-50"
                  : "hover:ring-1 hover:ring-gray-300"
                  }`}
                style={{ backgroundColor: color }}
                aria-label={`Chọn màu ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Chọn size */}
        {availableSizes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Kích thước</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size.sizeName}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-sm rounded-md border transition-all ${selectedSize?.sizeName === size.sizeName
                    ? "bg-black text-white border-black"
                    : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                >
                  {size.sizeName}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedSize && (
          <div className="flex items-center justify-between mt-4">
            {/* Điều chỉnh số lượng */}
            <div className="flex items-center">
              <h2 className="text-sm font-medium text-gray-900 mr-4">Số lượng:</h2>
              <button
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                {quantity}
              </div>
              <button
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= selectedSize.stock}
              >
                +
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Số lượng còn lại:{" "}
              <span className="font-semibold">{selectedSize.stock} sản phẩm</span>
            </p>
          </div>
        )}

        {/* Nút thêm vào giỏ hàng + Mua ngay */}
        <div className="mt-6 flex flex-col gap-4">
          <button
            className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50"
            disabled={!selectedSize || loading}
            onClick={handleAddToCart}
          >
            {loading ? (
              "Đang thêm..."
            ) : (
              <>
                <ShoppingBagIcon size={18} className="mr-2" />
                Thêm vào giỏ hàng
              </>
            )}
          </button>

          <button
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={!selectedSize}
          >
            {selectedSize ? "Mua ngay" : "Chọn kích thước trước"}
          </button>
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
          {/* Miễn phí vận chuyển */}
          <div className="flex items-center text-sm text-gray-700">
            <TruckIcon size={20} className="mr-2 text-green-600" />
            <span className="font-medium text-gray-900">
              Miễn phí vận chuyển
            </span>
            <span className="ml-1 text-gray-600">cho đơn hàng từ 499K</span>
          </div>

          {/* Chia sẻ sản phẩm */}
          <div className="flex items-center text-sm text-gray-700">
            <ShareIcon size={20} className="mr-2 text-gray-500" />
            <span className="font-medium text-gray-900">Chia sẻ:</span>
            <div className="ml-3 flex space-x-3">
              <a
                href="#"
                className="flex items-center text-blue-600 hover:text-blue-800 transition"
              >
                <FacebookIcon size={18} className="mr-1" />
                Facebook
              </a>

              <a
                href="#"
                className="flex items-center text-sky-400 hover:text-sky-600 transition"
              >
                <TwitterIcon size={18} className="mr-1" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Login */}
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          message="Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng."
        />)}
    </div>
  );
};

export default ProductCard;
