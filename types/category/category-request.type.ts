// --- Category ---
export interface CategoryRequest {
    name: string;
    slug: string;
    image: File
    sizes: SizeCategoryRequest[];
}

export interface SizeCategoryRequest {
   name: string;
   categoryId: number;
}
