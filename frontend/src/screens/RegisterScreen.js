import React, { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
// import LoginFormRow from "../components/LoginFormRow";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
import Wrapper from "../asset/wrappers/RegisterScreenWrapper.js";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isMember: true,
};

function RegisterScreen() {
  const [values, setValues] = useState(initialState);
  const { error, isLoading, user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, confirmPassword } = values;
    if (!email || !password || (!isMember && !name && confirmPassword)) {
      setMessage("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      setMessage(null);
      dispatch(registerUser({ name: name, email: email, password: password }));
    }
  };

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);
  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //   }
  // }, [user]);
  return (
    <Wrapper className='full-page'>
      {error && <Message variant='danger'>{error}</Message>}
      {message && <Message variant='danger'>{message}</Message>}
      {isLoading && <Loader />}
      <form className='form' onSubmit={onSubmit}>
        {/* <Logo /> */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            placeholder='name'
            handleChange={handleChange}
            className='form-center'
          />
        )}
        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          placeholder='email'
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          placeholder='password'
          handleChange={handleChange}
        />
        {/* confirm password field */}
        {!values.isMember && (
          <FormRow
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
            placeholder='confirm password'
            handleChange={handleChange}
          />
        )}
        <button
          type='submit'
          className='btn btn-block'
          disabled={isLoading}
          onClick={onSubmit}
        >
          {isLoading ? "loading..." : "submit"}
        </button>
        {/* <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: values.email, password: values.password })
            )
          }
        >
          {isLoading ? "loading..." : "demo app"}
        </button> */}
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}
export default RegisterScreen;
