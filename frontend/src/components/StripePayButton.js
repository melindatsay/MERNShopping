import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const StripePayButton = ({ cartItems }) => {
  const { user } = useSelector((store) => store.user);

  const handleCheckout = () => {
    const userId = user._id;
    let url = "http://localhost:3000/api";
    axios
      .post(`${url}/stripe/create-checkout-session`, {
        cartItems,
        userId,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button className='btn-block btn-dark' onClick={() => handleCheckout()}>
        Pay with Stripe
      </Button>
    </>
  );
};

export default StripePayButton;
