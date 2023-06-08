import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder } from "../features/order/orderSlice";
import CartItems from "../components/CartItems";

const PlaceOrderScreen = () => {
  const { user } = useSelector((store) => store.user);
  const { name, address, city, state, postalCode, country } =
    user.shippingAddress;
  const order = useSelector((store) => store.order);
  const { isLoading, error, success, paymentMethod, orderCreated } = order;

  const cart = useSelector((store) => store.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    if (cart.totalItems === 0) {
      navigate("/cart");
    }
    if (!user.shippingAddress.address) {
      navigate("/shipping");
    }
    console.log(order.paymentMethod);
    // if (!order.paymentMethod) {
    //   navigate("/payment");
    // }

    if (success) {
      navigate(`/order/${orderCreated._id}`);
    }
  }, [navigate, user, cart, order]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        user: user,
        orderItems: cart.cartItems,
        shippingAddress: user.shippingAddress,
        paymentMethod: order.paymentMethod,
        itemsPrice: cart.totalPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Name</h2>
              {name}
              <h2>Shipping Address</h2>
              {address}, {city}, {state}, {postalCode}, {country}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {item.name}
                          {/* <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link> */}
                        </Col>
                        <Col md={4}>
                          {item.currentQuantity} x ${item.price} = $
                          {item.currentQuantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            {/* <ListGroup.Item>
              <h2>Order Items</h2>
              <CartItems cartItems={cart.cartItems} />
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item> */}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Amount</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$0</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && <Message variant='danger'>{error}</Message>}

              <Button
                type='button'
                className='btn-block btn-dark'
                disabled={cart.totalItems === 0}
                onClick={handleSubmit}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
