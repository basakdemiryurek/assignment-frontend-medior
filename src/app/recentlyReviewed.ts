import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecentlyViewedState {
  recentlyReviwedProducts: string[];
}

const initialState: RecentlyViewedState = {
  recentlyReviwedProducts: [],
};

export const recentlyViewedSlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    productReviwed: (state, action: PayloadAction<string>) => {
      const productIndex = state.recentlyReviwedProducts.findIndex(
        (id) => id === action.payload
      );

      if (productIndex !== -1) {
        state.recentlyReviwedProducts.splice(productIndex, 1);
      }

      state.recentlyReviwedProducts.unshift(action.payload);

      if (state.recentlyReviwedProducts.length > 5) {
        state.recentlyReviwedProducts.pop();
      }
    },
  },
});

export const { productReviwed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice;
