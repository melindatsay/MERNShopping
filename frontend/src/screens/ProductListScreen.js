// import React, {useState} from "react"
// import { useLocation } from 'react-router-dom';
// import {useSelector } from "react-redux"
// import {Row, Col, Form} from "react-bootstrap"
// import Products from "../components/ProductsContainer"

// import { listProducts } from "../actions/productActions"

// const ProductListScreen = () => {

//   // const productList = useSelector(state => state.productList)
//   // const {loading, err, products} = productList
//   // const location = useLocation();
//   // const cat = location.pathname.split("/")[2];
//   const [filters, setFilters] = useState({});
//   const [sort, setSort] = useState("newest");

//   const handleFilters = (e) => {
//     const value = e.target.value;
//     setFilters({
//       ...filters,
//       [e.target.name]: value,
//     });
//   };

//   return (
//     <>
//          <h1>Latest Products</h1>

//         <>
//         <Row>
//         <Col md={3}>
//         <h5>Filter Products:</h5>
//         </Col>
//         <Col md={2}>
//         <Form.Control
//             as="select"
//             name="category"
//             onChange={handleFilters}
//           >
//           <option disabled>Category</option>
//           <option>All</option>
//           <option>electronics</option>
//           <option>gaming</option>
//         </Form.Control>
//         </Col>
//         <Col md={2}>
//         <Form.Control
//             as="select"
//             name="category"
//             onChange={handleFilters}
//           >
//           <option disabled>Brand</option>
//           <option>All</option>
//           <option>Apple</option>
//           <option>Nintendo</option>
//         </Form.Control>
//         </Col>
//         <Col md={3}>
//         <h5>Sort Products:</h5>
//         </Col>
//         <Col md={2}>
//         <Form.Control
//             as="select"
//             name="category"
//             onChange={(e) => setSort(e.target.value)}
//           >
//           <option value="all">All</option>
//           <option value="newest">Newest</option>
//           <option value="oldest">Oldest</option>
//           <option value="topRated">Top Rated</option>
//           <option value="asc">Price (asc)</option>
//           <option value="desc">Price (desc)</option>
//         </Form.Control>
//         </Col>
//         </Row>

//           <Products filters={filters} sort={sort} />
//           {/* <Row>
//             {products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row> */}

//         </>

//     </>
//   )
// }

// export default ProductListScreen
import React from "react";
import AllProducts from "../components/AllProducts";

const ProductListScreen = () => {
  return (
    <>
      <AllProducts />
    </>
  );
};

export default ProductListScreen;
