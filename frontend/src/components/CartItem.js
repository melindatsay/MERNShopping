import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  changeQuantity,
  calculateTotals,
} from "../features/cart/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const changeQuantityHandler = (productId, quantitySelected) => {
    dispatch(changeQuantity({ productId, quantitySelected }));
    dispatch(calculateTotals());
  };

  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
    dispatch(calculateTotals());
  };
  return (
    <Row>
      <Col md={2}>
        <Image src={item.image} alt={item.name} fluid className='cart-img' />
      </Col>
      <Col ml={3}>
        <Link to={`/products/${item._id}`} className='text-dark'>
          {item.name}
        </Link>
      </Col>
      <Col md={2}>${item.price}</Col>
      <Col md={2}>
        <Form.Control
          className='cart-select'
          as='select'
          value={item.currentQuantity}
          onChange={(e) =>
            changeQuantityHandler(item._id, Number(e.target.value))
          }
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col md={2}>
        <Button
          type='button'
          variant='light'
          onClick={() => removeFromCartHandler(item._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
