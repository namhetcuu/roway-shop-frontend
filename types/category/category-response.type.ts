// --- Category ---
export interface CategoryResponse {
    id: number;
    name: string;
    slug: string;
    image: string;
    sizes: SizeCategoryResponse[];
}

export interface SizeCategoryResponse{
    id: number;
    name: string;
    categoryId: number;
 }
 