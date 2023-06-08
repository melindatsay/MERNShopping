import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StaticRouter } from "react-router-dom";
import {
  addAddressInfoToLocalStorage,
  getAddressInfoFromLocalStorage,
} from "../../utils/localStorage";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: true,
};

// export const getCartItems = createAsyncThunk(
//   'cart/getCartItems',
//   async (name, thunkAPI) => {
//     try {
//       // console.log(name);
//       // console.log(thunkAPI);
//       // console.log(thunkAPI.getState());
//       // thunkAPI.dispatch(openModal());
//     //   const resp = await axios(url);

//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue('something went wrong');
//     }
//   }
// );

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    addToCart: (state, action) => {
      const { product, quantityAdded } = action.payload;
      const quantityAddedNum = Number(quantityAdded);
      let cartItem = state.cartItems.find((item) => item._id === product._id);
      if (
        cartItem &&
        cartItem.currentQuantity + quantityAddedNum >= cartItem.countInStock
      ) {
        cartItem.currentQuantity = cartItem.countInStock;
      } else if (cartItem) {
        cartItem.currentQuantity = cartItem.currentQuantity + quantityAddedNum;
      } else {
        cartItem = { ...product, currentQuantity: 0 };
        cartItem.currentQuantity = cartItem.currentQuantity + quantityAddedNum;
        state.cartItems.push(cartItem);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    changeQuantity: (state, action) => {
      const { productId, quantitySelected } = action.payload;
      //   console.log('quantity' + quantitySelected)
      //   const quantitySelectedNum = Number(quantitySelected)
      const cartItem = state.cartItems.find((item) => item._id === productId);
      cartItem.currentQuantity = quantitySelected;
    },
    // decrease: (state, { payload }) => {
    //   const cartItem = state.cartItems.find((item) => item._id === payload.id);
    //   cartItem.amount = cartItem.amount - 1;
    // },
    calculateTotals: (state) => {
      state.totalItems = state.cartItems.reduce(
        (acc, item) => acc + item.currentQuantity,
        0
      );
      state.totalPrice = state.cartItems
        .reduce((acc, item) => acc + item.currentQuantity * item.price, 0)
        .toFixed(2);
      //   let amount= 0;
      //   let total = 0;
      //   state.cartItems.forEach((item) => {
      //     amount += item.amount;
      //     total += item.amount * item.price;
      //   });
      //   state.amount = amount;
      //   state.total = total;
    },
  },
  extraReducers: {
    // [getCartItems.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getCartItems.fulfilled]: (state, action) => {
    //   // console.log(action);
    //   state.isLoading = false;
    //   state.cartItems = action.payload;
    // },
    // [getCartItems.rejected]: (state, action) => {
    //   console.log(action);
    //   state.isLoading = false;
    // },
  },
});

// console.log(cartSlice);
export const {
  clearCart,
  addToCart,
  removeFromCart,
  changeQuantity,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
