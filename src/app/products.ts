import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fruit } from "types/Fruit";
import { Vegetable } from "types/Vegetable";

interface ProductState {
  products: (Vegetable | Fruit)[];
  selectedProduct?: Vegetable | Fruit;
}

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<(Vegetable | Fruit)[]>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<string>) => {
      state.selectedProduct = state.products.find(
        (item) => item.id === action.payload
      );
    },
  },
});

export const { setProducts, setSelectedProduct} = productSlice.actions;

export default productSlice;
