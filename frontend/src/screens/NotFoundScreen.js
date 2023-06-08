import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../mobile";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearFilters } from "../features/allProducts/allProductsSlice";

const Container = styled.div`
  margin: 3px;
  height: 100vh;
  position: relative;
  ${mobile({ height: "50vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 55px;
  color: white;
  margin-bottom: 0px;
  ${mobile({ fontSize: "30px" })}
`;

const SubTitle = styled.h4`
  color: white;
  margin-bottom: 50px;
  ${mobile({ display: "none" })}
`;
const Button = styled.button`
  border: none;
  padding: 10px 40px 10px 40px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    transform: scale(1.2);
    transition: all 0.5s ease;
  }
  ${mobile({ padding: "6px 25px" })}
`;

const NotFoundScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    navigate("/products");
  };
  return (
    <Container>
      <Link to='/products' onClick={handleSubmit}>
        <Image src='/images/keyvision.jpg' />
        <Info>
          <Title>
            P a g e&nbsp;&nbsp;&nbsp;N o t&nbsp;&nbsp;&nbsp;F o u n d
          </Title>
          <SubTitle>S c a n d i n a v i a n &nbsp;&nbsp;D e s i g n</SubTitle>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default NotFoundScreen;
