// import React from "react";
// import FormRow from "./FormRow";
// import FormRowSelect from "./FormRowSelect";
// import Wrapper from "../asset/wrappers/SearchContainerWrapper.js";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   handleChange,
//   clearFilters,
// } from "../features/allProducts/allProductsSlice";

// const SearchContainer = () => {
//   const { isLoading, search, filterBrand, filterCategory, sort, sortOptions } =
//     useSelector((store) => store.allProducts);

//   const { brandOptions, categoryOptions } = useSelector(
//     (store) => store.product
//   );

//   const dispatch = useDispatch();

//   const handleSearch = (e) => {
//     if (isLoading) return;
//     dispatch(handleChange({ name: e.target.name, value: e.target.value }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(clearFilters());
//   };

//   return (
//     <Wrapper>
//       <form className='form'>
//         <p className='p'>search</p>
//         <div className='form-center'>
//           {/* search name */}
//           <FormRow
//             className='my-3'
//             type='text'
//             name='search'
//             value={search}
//             placeholder='search'
//             handleChange={handleSearch}
//           />
//           {/* filter by brand */}
//           <FormRowSelect
//             className='my-3'
//             labelText='brand'
//             name='filterBrand'
//             value={filterBrand}
//             handleChange={handleSearch}
//             list={["all", ...brandOptions]}
//           />

//           {/* filter by category*/}
//           <FormRowSelect
//             className='my-3'
//             labelText='category'
//             name='filterCategory'
//             value={filterCategory}
//             handleChange={handleSearch}
//             list={["all", ...categoryOptions]}
//           />
//           {/* sort */}
//           <FormRowSelect
//             className='my-3'
//             labelText='sort'
//             name='sort'
//             value={sort}
//             handleChange={handleSearch}
//             list={sortOptions}
//           />
//           <button
//             className='btn btn-block btn-dark form-5 my-3'
//             disabled={isLoading}
//             onClick={handleSubmit}
//           >
//             clear filters
//           </button>
//         </div>
//       </form>
//     </Wrapper>
//   );
// };
// export default SearchContainer;

import React from "react";
import { Row, Col } from "react-bootstrap";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../asset/wrappers/SearchContainerWrapper.js";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
} from "../features/allProducts/allProductsSlice";

const SearchContainer = () => {
  const { isLoading, search, filterBrand, filterCategory, sort, sortOptions } =
    useSelector((store) => store.allProducts);

  const { brandOptions, categoryOptions } = useSelector(
    (store) => store.product
  );

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Row sm={1} md={1} lg={1} xl={5}>
      <Col>
        {/* <p className='my-0'>search</p> */}
        {/* search name */}
        <FormRow
          // labelText='search'
          type='text'
          name='search'
          value={search}
          placeholder='search'
          handleChange={handleSearch}
          className='search-box'
        />
      </Col>
      <Col>
        {/* filter by brand */}
        <FormRowSelect
          labelText='brand'
          name='filterBrand'
          value={filterBrand}
          handleChange={handleSearch}
          list={["all brand", ...brandOptions]}
        />
      </Col>
      <Col>
        {/* filter by category*/}
        <FormRowSelect
          labelText='category'
          name='filterCategory'
          value={filterCategory}
          handleChange={handleSearch}
          list={["all category", ...categoryOptions]}
        />
      </Col>
      <Col>
        {/* sort */}
        <FormRowSelect
          labelText='sort'
          name='sort'
          value={sort}
          handleChange={handleSearch}
          list={sortOptions}
        />
      </Col>
      <Col>
        <button
          className='btn btn-block btn-dark btn-sm my-0 filter-button'
          disabled={isLoading}
          onClick={handleSubmit}
        >
          clear filters
        </button>
      </Col>
    </Row>
  );
};
export default SearchContainer;
