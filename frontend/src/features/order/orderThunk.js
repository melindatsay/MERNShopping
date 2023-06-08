import axios from "axios";
import { clearCart } from "../cart/cartSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";

export const createOrderThunk = async (url, order, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      // const user = getUserFromLocalStorage();
      if (order.user) {
        config.headers.common["Authorization"] = `Bearer ${order.user.token}`;
      }
      return config;
    });
    const resp = await axios.post(url, order);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI)
    // return thunkAPI.rejectWithValue(error.response.data.errors);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);

    // return message;
  }
};

export const getOrderDetailsThunk = async (url, orderId, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      //   const user = thunkAPI.getState().user;
      const user = getUserFromLocalStorage();
      if (user) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    });
    const resp = await axios.get(url, orderId);
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI)
    // return thunkAPI.rejectWithValue(error.response.data.errors);
    console.log(message);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);

    // return message;
  }
};

export const getMyOrderListThunk = async (url, user, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      //   const user = thunkAPI.getState().user;
      const user = getUserFromLocalStorage();
      if (user) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    });
    const resp = await axios.get(url, user);
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI)
    // return thunkAPI.rejectWithValue(error.response.data.errors);
    console.log(message);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);

    // return message;
  }
};

export const payOrderThunk = async (url, paymentResult, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      const user = thunkAPI.getState().user;
      if (user._id) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    });
    const resp = await axios.put(url, paymentResult);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI)
    // return thunkAPI.rejectWithValue(error.response.data.errors);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);

    // return message;
  }
};

export const deliverOrderThunk = async (url, orderDetails, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      const user = thunkAPI.getState().user;
      if (user._id) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    });
    const resp = await axios.put(url, {});
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI)
    // return thunkAPI.rejectWithValue(error.response.data.errors);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);

    // return message;
  }
};

//   export const loginUserThunk = async (url, user, thunkAPI) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const resp = await axios.post(url, user, config);
//       return resp.data;
//     } catch (error) {
//       // return thunkAPI.rejectWithValue(error.response.data.msg);
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       return thunkAPI.rejectWithValue(message);
//     }
//   };

//   export const updateUserThunk = async (url, updatedUser, thunkAPI) => {
//     try {
//       // const user = getUserFromLocalStorage();
//       // const config = {
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     Authorization: `Bearer ${user.token}`,
//       //   },
//       // };
//       axios.interceptors.request.use((config) => {
//         const user = getUserFromLocalStorage();
//         if (user) {
//           config.headers.common["Authorization"] = `Bearer ${user.token}`;
//         }
//         return config;
//       });
//       const resp = await axios.put(url, updatedUser);
//       return resp.data;
//     } catch (error) {
//       // return checkForUnauthorizedResponse(error, thunkAPI)
//       // return thunkAPI.rejectWithValue(error.response.data.errors);
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       return thunkAPI.rejectWithValue(message);

//       // return message;
//     }
//   };
