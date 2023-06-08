import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllProductsThunk } from "./allProductsThunk";

const initialFiltersState = {
  search: "",
  filterBrand: "all brand",
  filterCategory: "all category",
  sort: "latest",
  sortOptions: ["latest", "oldest", "price-ascending", "price-descending"],
  page: 1,
};

const initialState = {
  isLoading: true,
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  // page: 1,
  // stats: {},
  // monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllProducts = createAsyncThunk(
  "allProducts/getProducts",
  getAllProductsThunk
);

//   export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk);

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllProductsState: (state) => initialState,
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.products = payload.products;
      state.numOfPages = payload.numOfPages;
      state.totalProducts = payload.totalProducts;
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    //   [showStats.pending]: (state) => {
    //     state.isLoading = true;
    //   },
    //   [showStats.fulfilled]: (state, { payload }) => {
    //     state.isLoading = false;
    //     state.stats = payload.defaultStats;
    //     state.monthlyApplications = payload.monthlyApplications;
    //   },
    //   [showStats.rejected]: (state, { payload }) => {
    //     state.isLoading = false;
    //     toast.error(payload);
    //   },
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllProductsState,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
