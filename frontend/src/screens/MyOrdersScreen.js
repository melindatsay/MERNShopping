import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getMyOrderList } from "../features/order/orderSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
const MyOrdersScreen = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myOrderLists, errorMyOrderLists, loadingMyOrderLists } = useSelector(
    (store) => store.order
  );
  console.log(myOrderLists);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    if (myOrderLists.length === 0) {
      dispatch(getMyOrderList(user._id));
    }
  }, [dispatch, navigate, user, myOrderLists]);

  return (
    <>
      <h2>My orders</h2>
      {loadingMyOrderLists ? (
        <Loader />
      ) : errorMyOrderLists ? (
        <Message variant='danger'>{errorMyOrderLists}</Message>
      ) : (
        <Table hover responsive>
          <thead className='order-table-head'>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myOrderLists.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>$ {order.totalPrice}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      className='btn btn-block btn-dark btn-sm'
                      variant='light'
                    >
                      Order Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyOrdersScreen;
