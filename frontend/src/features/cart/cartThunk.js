// import axios from "axios"

// export const addToCartThunk = async ({qtyAdded, id}, thunkAPI) => {
// //   const { product } = thunkAPI.getState().product;

//   let url = `/api/products/${id}`;
// //   if (search) {
// //     url = url + `&search=${search}`;
// //   }
//   try {
//     const resp = await axios.get(url);
//     console.log(resp.data)
//     return {...resp.data, qtyAdded};
//   } catch (error) {
//     // return checkForUnauthorizedResponse(error, thunkAPI);
//     console.log(error)
//   }
// };