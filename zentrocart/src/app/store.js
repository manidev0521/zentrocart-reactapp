
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

// Custom localStorage adapter for Vite
const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const persistConfig = {
  key: "zentro",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
