// import customAxios, { checkForUnauthorizedResponse } from "../../utils/axios";
import axios from "axios";
// import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { clearCart } from "../cart/cartSlice";
import { myOrderListsReset } from "../order/orderSlice";
import { logoutUser } from "./userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await axios.post(url, user, config);
    return resp.data;
  } catch (error) {
    // return error.message;
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const resp = await axios.post(url, user, config);
    return resp.data;
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.response.data.msg);
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return thunkAPI.rejectWithValue(message);
  }
};

export const updateUserThunk = async (url, updatedUser, thunkAPI) => {
  try {
    // const user = getUserFromLocalStorage();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // };
    axios.interceptors.request.use((config) => {
      const user = getUserFromLocalStorage();
      if (user) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    });
    const resp = await axios.put(url, updatedUser);
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

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    // thunkAPI.dispatch(clearAllJobsState());
    thunkAPI.dispatch(clearCart());
    thunkAPI.dispatch(myOrderListsReset());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
