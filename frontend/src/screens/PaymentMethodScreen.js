import React, { useState, useEffect } from "react";
import FormRadio from "../components/FormRadio";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Wrapper from "../asset/wrappers/PaymentMethodScreenWrapper.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";
import { savePaymentMethod } from "../features/order/orderSlice";

const PaymentMethodScreen = () => {
  const { user } = useSelector((store) => store.user);

  const [message, setMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    // if (!user.shippingAddress.address) {
    //   navigate("/shipping");
    // }
  }, [navigate, user, dispatch]);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { address, city, state, postalCode, country } = values;
    if (!paymentMethod) {
      setMessage("Please choose a payment method");
      return;
    }
    setMessage(null);
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/payment");
  };

  return (
    <Wrapper>
      {message && <Message variant='danger'>{message}</Message>}
      {/* {!message && !error && success && (
        <Message>Profile updated successfully!</Message>
      )} */}
      {/* {isLoading && <Loader />} */}
      <form className='form'>
        <h3>Payment Method</h3>
        <div className='form-center'>
          <FormRadio
            type='radio'
            id='PayPal'
            label='PayPal or Credit Card'
            name='paymentMethod'
            value='PayPal'
            handleChange={handleChange}
          />
          <FormRadio
            type='radio'
            id='Stripe'
            label='Stripe'
            name='paymentMethod'
            value='Stripe'
            handleChange={handleChange}
          />
          {/* <FormRow
            type='text'
            name='city'
            value={values.city}
            placeholder='city'
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='state'
            value={values.state}
            placeholder='state'
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='postalCode'
            value={values.postalCode}
            placeholder='postal code'
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='country'
            value={values.country}
            placeholder='country'
            handleChange={handleChange}
          /> */}
          <button
            type='submit'
            className='btn btn-block'
            disabled={false}
            onClick={handleSubmit}
          >
            continue
            {/* {isLoading ? "Please Wait..." : "save changes"} */}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default PaymentMethodScreen;
