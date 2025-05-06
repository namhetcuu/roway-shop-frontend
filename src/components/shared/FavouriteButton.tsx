// components/FavouriteButton.tsx

import { Heart } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFavourite } from "@/hooks/users/useFavourite";
import { ProductResponse } from "types/product/product-response.types";
import useAuth from "@/hooks/auth/useAuth";
import { toast } from "react-toastify"; // Import toastify
import { addFav, removeFav } from "@/redux/slices/favouriteSlice";

interface FavouriteButtonProps {
  product: ProductResponse;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ product }) => {
  const { token } = useAuth();
  const dispatch = useDispatch();
  const { id: productId } = product;

  // Lấy danh sách sản phẩm yêu thích từ Redux
  const favourites = useSelector((state: RootState) => state.favourites.favourites);
  const { addNewFavourite, removeFavourite: removeFavouriteItem } = useFavourite();

  // Kiểm tra nếu sản phẩm có trong danh sách yêu thích từ Redux
  const isFavourite = useMemo(() => {
    return favourites.some((fav) => fav.id === productId);
  }, [favourites, productId]);

  const handleToggle = useCallback(async () => {
    if (!token) {
      toast.error("Bạn chưa đăng nhập :(");
      return;
    }

    try {
      if (isFavourite) {
        await removeFavouriteItem(productId);  // Xóa khỏi yêu thích
        dispatch(removeFav(productId));         // Cập nhật Redux khi xóa
      } else {
        const newFavourite = await addNewFavourite(productId);  // Thêm vào yêu thích
        if (newFavourite) {
          dispatch(addFav(newFavourite));  // Cập nhật Redux khi thêm
        }
      }
    } catch {
      toast.error("Đã xảy ra lỗi khi xử lý yêu thích!");
    }
  }, [isFavourite, dispatch, productId, addNewFavourite, removeFavouriteItem, token]);

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-white rounded-full hover:bg-red-50 transition duration-200"
    >
      <Heart
        className={`w-5 h-5 ${isFavourite ? "text-red-500" : "text-gray-600"}`}
        fill={isFavourite ? "red" : "none"}
      />
    </button>
  );
};

export default FavouriteButton;
