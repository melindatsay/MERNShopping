import React from "react";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";

const CartItems = ({ cartItems }) => {
  return (
    <ListGroup variant='flush'>
      {cartItems.map((item) => {
        return (
          <ListGroup.Item key={item._id}>
            <CartItem item={item} />
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default CartItems;
