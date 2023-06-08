// import React, {useEffect} from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from 'react-router-dom';
// import {Row, Col} from "react-bootstrap"
// import Product from "../components/Product"
// import Message from "../components/Message"
// import Loader from "../components/Loader"
// import { listProducts } from "../actions/productActions"

// const LandingScreen = () => {
//   const dispatch = useDispatch()
//   const params = useParams()
//   const keyword = params.keyword;
//   const productList = useSelector(state => state.productList)
//   const {loading, err, products} = productList

//   useEffect(() => {
//     dispatch(listProducts(keyword))
//   }, [dispatch, keyword])

//   return (
//     <>
//          <h1>Latest Products</h1>
//       {loading ? (
//         <Loader />
//       ) : err ? (
//         <Message variant='danger'>{err}</Message>
//       ) : (
//         <>
//           <Row>
//             {products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>

//         </>
//       )}

//     </>
//   )
// }

// export default LandingScreen

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearFilters } from "../features/allProducts/allProductsSlice";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import KeyVision from "../components/KeyVision";

const LandingScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  return (
    <>
      <KeyVision />
      <Categories />
    </>
  );
};

export default LandingScreen;
