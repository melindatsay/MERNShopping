import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getPaymentMethodFromLocalStorage,
  addPaymentMethodToLocalStorage,
} from "../../utils/localStorage";
import {
  createOrderThunk,
  getOrderDetailsThunk,
  getMyOrderListThunk,
  payOrderThunk,
  deliverOrderThunk,
} from "./orderThunk";

const initialState = {
  isLoading: false,
  error: false,
  success: false,
  paymentMethod: getPaymentMethodFromLocalStorage(),
  orderCreated: {},
  orderDetails: {
    orderItems: [],
    shippingAddress: "",
    user: {},
    paymentMethod: "",
    paymentResult: "",
  },
  myOrderLists: [],
  loadingMyOrderLists: false,
  errorMyOrderLists: false,
  loadingPay: false,
  successPay: false,
  errorPay: false,
  loadingDeliver: false,
  successDeliver: false,
  errorDeliver: false,
};

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (order, thunkAPI) => {
    return createOrderThunk("/api/orders", order, thunkAPI);
  }
);

export const getOrderDetails = createAsyncThunk(
  "orders/getOrderDetails",
  async (orderId, thunkAPI) => {
    return getOrderDetailsThunk(`/api/orders/${orderId}`, orderId, thunkAPI);
  }
);

export const getMyOrderList = createAsyncThunk(
  "orders/getMyOrderList",
  async (userId, thunkAPI) => {
    return getMyOrderListThunk(`/api/orders/myorders`, userId, thunkAPI);
  }
);

export const payOrder = createAsyncThunk(
  "orders/payOrder",
  async ({ orderId, paymentResult }, thunkAPI) => {
    return payOrderThunk(`/api/orders/${orderId}/pay`, paymentResult, thunkAPI);
  }
);

export const deliverOrder = createAsyncThunk(
  "orders/payOrder",
  async (orderDetails, thunkAPI) => {
    return deliverOrderThunk(
      `/api/orders/${orderDetails._id}/deliver`,
      orderDetails,
      thunkAPI
    );
  }
);

// export const loginUser = createAsyncThunk(
//   "users/loginUser",
//   async (user, thunkAPI) => {
//     return loginUserThunk("/api/users/login", user, thunkAPI);
//   }
// );

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async (updatedUser, thunkAPI) => {
//     return updateUserThunk("/api/users/profile", updatedUser, thunkAPI);
//   }
// );
// export const clearStore = createAsyncThunk(
//   "api/user/clearStore",
//   clearStoreThunk
// );

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
    // logoutUser: (state, { payload }) => {
    //   state.user = null;
    //   //   state.isSidebarOpen = false;
    //   removeUserFromLocalStorage();
    //   state.success = false;
    //   if (payload) {
    //     toast.success(payload);
    //   }
    // },
    savePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload;
      addPaymentMethodToLocalStorage(payload);
      state.success = false;
    },
    myOrderListsReset: (state, { payload }) => {
      state.loadingMyOrderLists = false;
      state.errorMyOrderLists = false;
      state.myOrderLists = [];
    },
    payOrderReset: (state, { payload }) => {
      state.loadingPay = false;
      state.successPay = false;
      state.errorPay = false;
    },
    deliverOrderReset: (state, { payload }) => {
      state.loadingDeliver = false;
      state.successDeliver = false;
      state.errorDeliver = false;
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.isLoading = true;
    },
    [createOrder.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.isLoading = false;
      state.success = true;
      state.orderCreated = { ...payload };
      //   state.error = false;
      //   addUserToLocalStorage(payload);
      //   toast.success(`Hello There ${payload.name}`);
    },
    [createOrder.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.error = payload;
    },
    [getOrderDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrderDetails.fulfilled]: (state, { payload }) => {
      //   console.log(payload);
      state.isLoading = false;
      state.error = false;
      state.orderDetails = { ...state.orderDetails, ...payload };
    },
    [getOrderDetails.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.error = payload;
    },
    [getMyOrderList.pending]: (state) => {
      state.loadingMyOrderLists = true;
    },
    [getMyOrderList.fulfilled]: (state, { payload }) => {
      state.loadingMyOrderLists = false;
      state.errorMyOrderLists = false;
      state.myOrderLists = [...payload];
    },
    [getMyOrderList.rejected]: (state, { payload }) => {
      state.loadingMyOrderLists = false;
      toast.error(payload);
      state.errorMyOrderLists = payload;
    },

    [payOrder.pending]: (state) => {
      state.loadingPay = true;
    },
    [payOrder.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.loadingPay = false;
      state.errorPay = false;
      state.successPay = true;
    },
    [payOrder.rejected]: (state, { payload }) => {
      state.loadingPay = false;
      toast.error(payload);
      state.errorPay = payload;
    },
    [deliverOrder.pending]: (state) => {
      state.loadingDeliver = true;
    },
    [deliverOrder.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.loadingDeliver = false;
      state.errorDeliver = false;
      state.successDeliver = true;
    },
    [deliverOrder.rejected]: (state, { payload }) => {
      state.loadingDeliver = false;
      toast.error(payload);
      state.errorDeliver = payload;
    },
  },
});

export const {
  savePaymentMethod,
  myOrderListsReset,
  payOrderReset,
  deliverOrderReset,
} = orderSlice.actions;
export default orderSlice.reducer;
