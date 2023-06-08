import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../mobile";
import { useSelector, useDispatch } from "react-redux";
import { handleChange } from "../features/allProducts/allProductsSlice";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-family: "Playfair Display", serif;
  border: none;
  padding: 6px 25px 6px 25px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease;
  }
`;

const CategoryItem = ({ item }) => {
  const { isLoading } = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: "filterCategory", value: e.target.value }));
  };
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Link to={`/products/category/${item.cat}`}>
          <Button value={item.cat} onClick={handleClick}>
            SHOP NOW
          </Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
