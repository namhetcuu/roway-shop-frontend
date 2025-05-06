// --- Cart-related Interfaces ---
export interface CartResponse {
    id: number;
    userId: number;
    cartItems: CartItemResponse[];
    totalPrice: number;
}

export interface CartItemResponse {
    id: number;
    productId: number;
    productName: string;
    mainImageUrl: string;
    quantity: number;
    color: string;
    sizeName: string;
    price: number;
    subtotal: number;
    stock: number;
    inStock: boolean;
}