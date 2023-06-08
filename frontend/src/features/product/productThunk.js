import axios from "axios";

export const getProductThunk = async (id, thunkAPI) => {
  //   const { product } = thunkAPI.getState().product;

  let url = `/api/products/${id}`;
  //   if (search) {
  //     url = url + `&search=${search}`;
  //   }
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    // return checkForUnauthorizedResponse(error, thunkAPI);
    console.log(error);
  }
};
