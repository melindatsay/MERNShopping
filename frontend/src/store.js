// // import { applyMiddleware } from "redux"
// import { configureStore } from '@reduxjs/toolkit'
// import thunk from "redux-thunk"
// // import { composeWithDevTools } from "redux-devtools-extension"
// import { productDetailsReducer, productListReducer } from "./reducers/productReducers"
// import { cartReducer } from "./reducers/cartReducers.js"

// const reducer = {
//     productList: productListReducer,
//     productDetails: productDetailsReducer,
//     cart: cartReducer
// }

// const cartItemFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[]
// const preloadedState = {
//     cart: {cartItems: cartItemFromStorage}
// }

// const middleware = [thunk]
// const store = configureStore({
//     reducer,
//     preloadedState,
//     middleware,
//     // composeWithDevTools(applyMiddleware(...middleware))
// })

// export default store

// import { configureStore } from '@reduxjs/toolkit';
// import allProductsSlice from './features/allProducts/allProductsSlice';
// import productSlice from './features/product/productSlice';
// import cartSlice from './features/cart/cartSlice';

// export const store = configureStore({
//   reducer: {
//     allProducts: allProductsSlice,
//     product: productSlice,
//     cart: cartSlice
//   },
// });

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import allProductsSlice from "./features/allProducts/allProductsSlice";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";
import userSlice from "./features/user/userSlice";
import orderSlice from "./features/order/orderSlice";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    allProducts: allProductsSlice,
    product: productSlice,
    cart: persistedReducer,
    user: userSlice,
    order: orderSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
