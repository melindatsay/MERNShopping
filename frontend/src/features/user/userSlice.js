import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  removeAddressInfoFromLocalStorage,
} from "../../utils/localStorage";
import {
  loginUserThunk,
  registerUserThunk,
  updateUserThunk,
  clearStoreThunk,
} from "./userThunk";

// addUserToLocalStorage("user", null);
const initialState = {
  isLoading: false,
  //   isSidebarOpen: false,
  error: false,
  success: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (user, thunkAPI) => {
    return registerUserThunk("/api/users/register", user, thunkAPI);
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (user, thunkAPI) => {
    return loginUserThunk("/api/users/login", user, thunkAPI);
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (updatedUser, thunkAPI) => {
    return updateUserThunk("/api/users/profile", updatedUser, thunkAPI);
  }
);
export const clearStore = createAsyncThunk(
  "api/user/clearStore",
  clearStoreThunk
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // toggleSidebar: (state) => {
    //   state.isSidebarOpen = !state.isSidebarOpen;
    // },
    logoutUser: (state, { payload }) => {
      state.user = null;
      //   state.isSidebarOpen = false;
      removeUserFromLocalStorage();
      state.success = false;
      if (payload) {
        toast.success(payload);
      }
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.isLoading = false;
      state.user = payload;
      state.error = false;
      addUserToLocalStorage(payload);
      toast.success(`Hello There ${payload.name}`);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      // const { user } = payload
      state.isLoading = false;
      state.user = payload;
      state.error = false;
      addUserToLocalStorage(payload);
      toast.success(`Welcome Back ${payload.name}`);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.error = payload;
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      // const { user } = payload;
      state.isLoading = false;
      state.user = payload;
      addUserToLocalStorage(payload);
      toast.success(`User Updated!`);
      state.error = false;
      state.success = true;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
      state.error = payload;
    },
    [clearStore.rejected]: () => {
      toast.error("There was an error..");
    },
  },
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
