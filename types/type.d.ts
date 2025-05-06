import { ProductRequest, SizeProductRequest, VariantRequest } from "./product/product-request.type";
import { ProductResponse, VariantResponse } from "./product/product-response.types";



declare interface CheckoutItem {
    productId: string;
    size: string;
    color: string;
    quantity: number;
}
// Điều chỉnh kiểu của handleVariantChange trong VariantsTableProps
declare interface VariantsTableProps {
    variants: VariantRequest[]; // Đảm bảo rằng bạn sử dụng đúng kiểu VariantRequest ở đây
    handleVariantChange: (index: number, key: keyof VariantRequest, value: string | File | SizeProductRequest[]) => void; // Sử dụng keyof VariantRequest
    addVariant: () => void;
    removeVariant: (index: number) => void;
    categorySizes: { id: number; name: string }[];
}


declare interface BasicDetailsProps {
    data: ProductRequest;
    handleData: <K extends keyof ProductRequest>(key: K, value: ProductRequest[K]) => void;
    handleCategoryChange: (categoryId: number, sizes: { id: number; name: string }[]) => void;
}

// Sửa `ImagesProps` để tránh trùng lặp
declare interface ImagesProps {
    data: {
        mainImageUrl: string | File | null;
        secondaryImageUrls: (string | File)[];
    } | null;
    setMainImageUrl: (value: string | File | null) => void;
    setSecondaryImageUrls: (value: (string | File)[]) => void;
    handleData: <K extends keyof ProductRequest>(key: K, value: ProductRequest[K]) => void;
}

declare interface DescriptionProps {
    data: {
        description?: string;
    } | null;
    handleData: <K extends keyof ProductRequest>(key: K, value: ProductRequest[K]) => void;
}

declare interface RowProps {
    item: {
        id: number;
        mainImageUrl: string;
        name: string;
        categoryName?: string;
        variants?: VariantResponse[];
    };
    index: number;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}
export interface FilterOptions {
  colors: string[];
  sizes: string[];
  tags: string[];
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  priceRange: {
    min: number;
    max: number;
  };
}
declare interface PageProps {
    params: { slug: string };
}

declare interface ProductCardProps {
    product: ProductResponse;
    onAddToCart: (productId: number) => void;
}

// --- Favourite-related Interfaces ---
declare interface FavouriteButtonProps {
    productId: number;
    token: string | null;
}

declare interface FavouriteContextProps {
    favourites: FavouriteItem[];
    toggleFavourite: (productId: number) => void;
}

declare const FavouriteContext: React.Context<FavouriteContextProps>;


declare interface Voucher {
    code: string;
    discountAmount: number;
    maxDiscountAmount?: number;
    discountType: "PERCENTAGE" | "FIXED";
    minOrderValue: number;
    expiryDate: string;
    active: boolean;
}
declare interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    address?: string;
    paymentMethod?: string;
    total: number;
}
declare interface ImageModalProps {
  imageUrl: string | null ;
  isOpen: boolean;
  onClose: () => void;
}

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sizes: string[]) => void;
  initialSizes?: string[];
}
interface SuccessModalProps {
    isOpen: boolean;
  }