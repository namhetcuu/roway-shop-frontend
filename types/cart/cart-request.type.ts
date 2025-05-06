// --- Cart-related Interfaces ---
export interface CartRequest {
    items: CartItemRequest[];
}

export interface CartItemRequest {
    productId: number;
    quantity?: number;
    sizeName: string;
    color: string;
}




