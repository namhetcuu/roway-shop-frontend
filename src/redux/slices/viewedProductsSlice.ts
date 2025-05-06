// store/slices/viewedProductsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewedState {
  viewedIds: number[];
}

const initialState: ViewedState = {
  viewedIds: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("viewedIds") || "[]")
    : [],
};

const viewedProductsSlice = createSlice({
  name: "viewedProducts",
  initialState,
  reducers: {
    addViewedProduct: (state, action: PayloadAction<number>) => {
      if (!state.viewedIds.includes(action.payload)) {
        state.viewedIds.push(action.payload);
        localStorage.setItem("viewedIds", JSON.stringify(state.viewedIds));
      }
    },
  },
});

export const { addViewedProduct } = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;
