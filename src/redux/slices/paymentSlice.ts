import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentMethod } from "types/shared/enums";

interface PaymentState {
  selectedMethod: PaymentMethod;
}

const initialState: PaymentState = {
  selectedMethod: PaymentMethod.COD, 
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.selectedMethod = action.payload;
    },
    clearPaymentMethod: (state) => {
      state.selectedMethod = PaymentMethod.COD; // ✅ Reset về mặc định
    },
  },
});

export const { setPaymentMethod, clearPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
