// import React, {useEffect, useState} from "react"
// import { useDispatch, useSelector } from "react-redux"
// import {useParams} from "react-router-dom"
// import {Row, Col} from "react-bootstrap"
// import axios from "axios"
// import { listProducts } from "../actions/productActions"
// import Product from "../components/Product"
// import Message from "../components/Message"
// import Loader from "../components/Loader"

// const Products = ({filters, sort}) => {
//   const dispatch = useDispatch()
//   const params = useParams()
//   const keyword = params.keyword;
//   const productList = useSelector(state => state.productList)
//   const {loading, err, products} = productList
// //   const [products, setProducts] = useState([]);
// //   const [filteredProducts, setFilteredProducts] = useState([]);

//   useEffect(() => {
//     dispatch(listProducts(keyword))
//     sort ==="topRated" && dispatch(listTopRatedProducts())

//   }, [dispatch, keyword, sort])

//     return (
//     <>
//         <Row>
//           {filteredProducts.length>0?
//             (filteredProducts.map((product) =>
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>))
//             : (products.map((product) =>
//             <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//             </Col>))}
//         </Row>
//     </>
//     )
// }

// export default Products

import React from "react";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import Product from "./Product";
// import Wrapper from '../assets/wrappers/JobsContainer';
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getAllProducts } from "../features/allProducts/allProductsSlice";
import PageBtnContainer from "./PageBtnContainer";
const ProductsContainer = () => {
  const {
    products,
    isLoading,
    page,
    totalProducts,
    numOfPages,
    search,
    filterBrand,
    filterCategory,
    sort,
  } = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
    window.scrollTo(0, 0);
  }, [page, search, filterBrand, filterCategory, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <Row>
        <h2 className='my-3 text-center'>No products to display...</h2>
      </Row>
    );
  }

  return (
    <Row>
      <h6 className='my-4 text-center results-found'>
        {totalProducts} result{products.length > 1 && "s"} found
      </h6>

      {products.map((product) => {
        return (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='my-3'>
            <Product product={product} />
          </Col>
        );
      })}

      {numOfPages > 1 && <PageBtnContainer />}
    </Row>
  );
};
export default ProductsContainer;
