import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getOrderDetails,
  payOrder,
  payOrderReset,
  deliverOrder,
  deliverOrderReset,
} from "../features/order/orderSlice";

const OrderScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const {
    orderDetails,
    isLoading,
    error,
    success,
    loadingPay,
    successPay,
    loadingDeliver,
    successDeliver,
  } = useSelector((store) => store.order);
  // const { shippingAddress } = orderDetails;
  // const { address } = shippingAddress;
  // console.log(orderDetails);

  const { user } = useSelector((store) => store.user);

  //   if (!loading) {
  //     //   Calculate prices
  //     const addDecimals = (num) => {
  //       return (Math.round(num * 100) / 100).toFixed(2)
  //     }

  //     order.itemsPrice = addDecimals(
  //       order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  //     )
  //   }

  const addPayPalScript = async () => {
    const { data: clientId } = await axios.get("/api/config/paypal");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // dispatch(getOrderDetails(params.id));
    if (!orderDetails) {
      dispatch(getOrderDetails(params.id));
    }
    if (
      //   console.log(orderDetails === null)
      !orderDetails ||
      successPay ||
      successDeliver ||
      orderDetails._id !== params.id
    ) {
      dispatch(payOrderReset);
      dispatch(deliverOrderReset);
      dispatch(getOrderDetails(params.id));
    } else if (!orderDetails.isPaid) {
      if (!window.paypal) {
        // addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, params, orderDetails, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(params.id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(orderDetails));
  };

  // return <h1>{orderDetails.shippingAddress.address}</h1>;
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      {/* <h1>Order Details</h1> */}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Details:</h2>
              <p>
                <strong> Order Number: </strong>
                {orderDetails._id}
              </p>
              <p>
                <strong>Name: </strong> {orderDetails.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${orderDetails.user.email}`}>
                  {orderDetails.user.email}
                </a>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping Information:</h2>
              <p>
                <strong>Name: </strong> {orderDetails.shippingAddress.name}
              </p>
              <p>
                <strong>Address: </strong>
                {orderDetails.shippingAddress.address},{" "}
                {orderDetails.shippingAddress.city},{" "}
                {orderDetails.shippingAddress.state},{" "}
                {orderDetails.shippingAddress.postalCode},{" "}
                {orderDetails.shippingAddress.country}
              </p>
              {orderDetails.isDelivered ? (
                <Message variant='success'>
                  Delivered on {orderDetails.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <p>
                <strong>Method: </strong>
                {orderDetails.paymentMethod}
              </p>
              {orderDetails.paymentResult.status === "paid" ? (
                <Message variant='success'>Paid</Message>
              ) : (
                <Message variant='danger'>
                  Not Paid (Usually takes 2-3 Business Days to process the
                  payment)
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items:</h2>
              {orderDetails.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {orderDetails.orderItems.map((item, index) => (
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
                          {item.currentQuantity} x ${item.price} = $
                          {item.currentQuantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
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
                  <Col>Items</Col>
                  <Col>${orderDetails.totalPrice}</Col>
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
                  <Col>${orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {/* {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )} */}
              {loadingDeliver && <Loader />}
              {user &&
                user.isAdmin &&
                orderDetails.isPaid &&
                !orderDetails.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
