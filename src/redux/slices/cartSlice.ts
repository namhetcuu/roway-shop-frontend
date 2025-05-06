import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemResponse } from "types/cart/cart-response.type";

type CartState = {
  cart: CartItemResponse[];
  order: CartItemResponse[];
};

const initialState: CartState = {
  cart: [],
  order: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemResponse>) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    
    clearCart: (state) => {
      state.cart = [];
    },

    // 🛑 Lưu giỏ hàng từ backend (useCart)
    setCartFromBackend: (state, action: PayloadAction<CartItemResponse[]>) => {
      state.cart = action.payload;
    },

    // 🛑 Chuyển giỏ hàng vào đơn hàng
    setOrder: (state) => {
      state.order = [...state.cart];
      state.cart = [];
    },
  },
});

export const { addToCart, clearCart, setOrder, setCartFromBackend } = cartSlice.actions;
export default cartSlice.reducer;
