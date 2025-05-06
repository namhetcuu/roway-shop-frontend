
  // --- Product-related Interfaces ---
  export interface ProductRequest {
    name: string;
    slug: string;
    shortDescription: string;
    description: string;
    productCode: string;
    featured: boolean;
    sale: boolean;
    active: boolean;
    salePercentage: number;
    categoryId: number;
    mainImageUrl: File | string;
    secondaryImageUrls: (File | string)[];
    descriptionImageUrls: (File | string)[];
    tags?: string[];
    variants: VariantRequest[];
    createdAt: Date;
    updatedAt: Date;
  }
  export interface SizeProductRequest {
    sizeName: string;
    stock: number;
    price: number;
  }
  export interface VariantRequest {
    color: string;
    imageUrl?: File | null;
    sizes: SizeProductRequest[];
  }
