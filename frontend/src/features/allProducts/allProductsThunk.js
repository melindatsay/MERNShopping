// import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import axios from 'axios'

export const getAllProductsThunk = async (_, thunkAPI) => {
  const { page, search, filterBrand, filterCategory, sort } =
    thunkAPI.getState().allProducts;

  let url = `/api/products?brand=${filterBrand}&category=${filterCategory}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.log(error)
    // return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// export const showStatsThunk = async (_, thunkAPI) => {
//   try {
//     const resp = await customFetch.get('/jobs/stats');

//     return resp.data;
//   } catch (error) {
//     return checkForUnauthorizedResponse(error, thunkAPI);
//   }
// };