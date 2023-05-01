import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import cart from "./cart";
import recentlyReviewed from "./recentlyReviewed";
import products from "./products";
import tags from "./tags";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [products.name]: products.reducer,
    [tags.name]: tags.reducer,
    [cart.name]: cart.reducer,
    [recentlyReviewed.name]: recentlyReviewed.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
