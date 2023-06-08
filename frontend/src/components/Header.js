import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
// import Image from "react-bootstrap/Image";
// import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
// import { Badge } from "@material-ui/core";
import { Badge } from "@mui/material";
import styled from "styled-components";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser, clearStore } from "../features/user/userSlice";
import { clearFilters } from "../features/allProducts/allProductsSlice";
import { handleChange } from "../features/allProducts/allProductsSlice";
import BrandCategories from "./BrandCategories";

const Header = () => {
  const { totalItems } = useSelector((state) => state.cart);
  const { user, error, isLoading } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(handleChange({ name: "filterBrand", value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
    navigate("/products");
  };

  const logoutHandler = () => {
    dispatch(clearStore());
    navigate("/login");
  };

  return (
    <header>
      <Navbar bg='light' variant='light' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/' className='brand-logo'>
            <Navbar.Brand>. H o m e &nbsp;&nbsp;&nbsp;R e t r o </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav className='ms-auto'>
              <LinkContainer
                to='/products'
                className='navbar-category'
                onClick={handleSubmit}
              >
                <Nav.Link>New Arrivals</Nav.Link>
              </LinkContainer>
              <BrandCategories
                className='navbar-category'
                handleClick={handleClick}
              />

              {user ? (
                <>
                  <NavDropdown
                    title={user.name}
                    id='username'
                    className='navbar-user-name ml-5'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/myorders'>
                      <NavDropdown.Item>Order</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login' className='navbar-user-icon ml-5'>
                  <Nav.Link>
                    <PermIdentityOutlinedIcon fontSize='large' />
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* <div className='shopping-cart' onClick={() => navigate('/cart')}>
        <ShoppingCart id='cartIcon'/>
        <p>{totalItems}</p>
      </div> */}
              <LinkContainer to='/cart' className='navbar-cart-icon ml-5'>
                <Nav.Link>
                  {totalItems > 0 ? (
                    <Badge badgeContent={totalItems} color='error'>
                      <ShoppingBagOutlinedIcon fontSize='large' />
                    </Badge>
                  ) : (
                    <ShoppingBagOutlinedIcon fontSize='large' />
                  )}
                </Nav.Link>
              </LinkContainer>
              {/* {totalItems > 0 && (
                <LinkContainer to='/cart'>
                  <div className='cart'>
                    <div className='counter'>{totalItems}</div>
                  </div>
                </LinkContainer>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
