import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddressResponse } from "types/address/address-response.type";

interface AddressState {
  selectedAddress: AddressResponse | null;
}

const initialState: AddressState = {
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<AddressResponse>) => {
      state.selectedAddress = action.payload;
    },
    clearAddress: (state) => {
      state.selectedAddress = null; // Reset về giá trị ban đầu
    },
  },
});

export const { setSelectedAddress, clearAddress} = addressSlice.actions;
export default addressSlice.reducer;
