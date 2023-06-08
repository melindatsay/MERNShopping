import React, { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Wrapper from "../asset/wrappers/ShippingScreenWrapper.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  updateUser,
} from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";
const ShippingScreen = () => {
  const { user } = useSelector((store) => store.user);
  const [values, setValues] = useState({
    name: user.shippingAddress.name || "",
    address: user.shippingAddress.address || "",
    city: user.shippingAddress.city || "",
    state: user.shippingAddress.state || "",
    postalCode: user.shippingAddress.postalCode || "",
    country: user.shippingAddress.country || "",
  });
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, address, city, state, postalCode, country } = values;
    if (!name || !address || !city || !state || !postalCode || !country) {
      setMessage("Please fill out all fields");
      return;
    }
    setMessage(null);
    dispatch(updateUser({ ...user, shippingAddress: values }));
    navigate("/payment");
  };

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [navigate, user, dispatch]);

  return (
    <Wrapper>
      {message && <Message variant='danger'>{message}</Message>}
      {/* {!message && !error && success && (
        <Message>Profile updated successfully!</Message>
      )} */}
      {/* {isLoading && <Loader />} */}
      <form className='form'>
        <h2>Shipping Information</h2>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={values.name}
            placeholder='name'
            handleChange={handleChange}
          />
          <FormRow
            type='text'
            name='address'
            value={values.address}
            placeholder='address'
            handleChange={handleChange}
          />
          <FormRow
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
          />
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

export default ShippingScreen;
