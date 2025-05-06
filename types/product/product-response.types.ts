// --- Product-related Interfaces ---
export interface ProductResponse {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  productCode: string;
  featured: boolean;
  sale: boolean;
  active: boolean;
  salePercentage: number;
  categoryName: string;
  mainImageUrl: string;
  secondaryImageUrls: string[];
  descriptionImageUrls: string[];
  tags?: string[];
  variants: VariantResponse[];
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariantResponse {
  id: number;
  color: string;
  imageUrl: string;
  sizes: SizeProductResponse[];
}

export interface SizeProductResponse {
  sizeName: string;
  stock: number;
  price: number;
  priceAfterDiscount: number;
}
