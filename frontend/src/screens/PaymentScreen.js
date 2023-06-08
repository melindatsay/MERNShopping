import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createOrder } from "../features/order/orderSlice";
import CartItems from "../components/CartItems";
import StripePayButton from "../components/StripePayButton";
import FormRadio from "../components/FormRadio";
import { savePaymentMethod } from "../features/order/orderSlice";

const PaymentScreen = () => {
  const { user } = useSelector((store) => store.user);
  const { name, address, city, state, postalCode, country } =
    user.shippingAddress;
  const order = useSelector((store) => store.order);
  const { isLoading, error, success, orderCreated } = order;

  const cart = useSelector((store) => store.cart);
  const { cartItems, totalItems } = cart;
  const [message, setMessage] = useState("Please choose a payment method");
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    if (cart.totalItems === 0) {
      navigate("/cart");
    }
    if (!user.shippingAddress) {
      navigate("/shipping");
    }
    if (paymentMethod !== order.paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
    }

    // if (success) {
    //   navigate(`/orders/${orderCreated._id}`);
    // }
  }, [dispatch, navigate, user, cart, order, paymentMethod]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
    dispatch(savePaymentMethod(paymentMethod));
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Information</h2>
              <p>
                <strong> Name: </strong>
                {name}
              </p>
              <p>
                <strong>Shipping Address: </strong>
                {address}, {city}, {state}, {postalCode}, {country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              {message && <Message variant='danger'>{message}</Message>}
              <h2>Payment Method</h2>
              {/* {paymentMethod} */}
              <form>
                <FormRadio
                  id='Stripe'
                  label='Stripe'
                  name='paymentMethod'
                  value='Stripe'
                  handleChange={handleChange}
                />
                <FormRadio
                  id='PayPal'
                  label='PayPal or Credit Card'
                  name='paymentMethod'
                  value='PayPal'
                  handleChange={handleChange}
                />
              </form>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              <CartItems cartItems={cart.cartItems} />
              {/* {cart.cartItems.length === 0 ? (
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
              )} */}
            </ListGroup.Item>
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
              {/* <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item> */}

              {paymentMethod === "PayPal" && (
                <ListGroup.Item>
                  {
                    <Message variant='danger'>
                      Paypal Checkout Coming Soon
                    </Message>
                  }
                </ListGroup.Item>
              )}
              {paymentMethod === "Stripe" && (
                <StripePayButton cartItems={cartItems} />
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentScreen;
