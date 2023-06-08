import React from "react"
import ProductsContainer from './ProductsContainer';
import SearchContainer from './SearchContainer';

const AllProducts = () => {
  return (
    <>
      <SearchContainer />
      <ProductsContainer />
    </>
  );
};
export default AllProducts;