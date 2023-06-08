import React from "react";
import styled from "styled-components";
import { brands } from "../data";
import { mobile } from "../mobile";
import { Link } from "react-router-dom";

const Button = styled.button`
  font-size: 18px;
  margin-top: 9px;
  margin-right: 15px;
  border: none;
  padding: 0;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: 200;
`;

const BrandCategories = ({ handleClick }) => {
  return (
    <>
      {brands.map((item) => (
        <Link
          to={`/products/brand/${item.brand}`}
          className='navbar-category ml-5'
        >
          <Button value={item.brand} onClick={handleClick}>
            {item.brand}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default BrandCategories;
