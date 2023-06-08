import React, { useState, useEffect } from "react";
import FormRow from "../components/FormRow";
import Wrapper from "../asset/wrappers/ProfileScreenWrapper.js";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { updateUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/localStorage";

const ProfileScreen = () => {
  const { isLoading, success, error, user } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Make changes to update profile!");
  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [navigate, user, dispatch, message]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = userData;
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage(null);
    dispatch(updateUser({ name, email, password }));
  };

  return (
    <Wrapper>
      {(message === "Passwords do not match" || error) && (
        <Message variant='danger'>{message || error}</Message>
      )}
      {message !== "Make changes to update profile!" &&
        !message &&
        !error &&
        success && <Message>Profile updated successfully!</Message>}
      {isLoading && <Loader />}
      <form className='form'>
        <h2>Update Profile</h2>
        <div className='form-center'>
          <FormRow
            type='text'
            // labelText='name'
            name='name'
            value={userData.name}
            placeholder='name'
            handleChange={handleChange}
          />
          <FormRow
            type='email'
            // labelText='email'
            name='email'
            value={userData.email}
            placeholder='email'
            handleChange={handleChange}
          />
          <FormRow
            type='password'
            // labelText='new password'
            name='password'
            value={userData.password}
            placeholder='Enter new password'
            handleChange={handleChange}
          />
          <FormRow
            type='password'
            // labelText='confirm new password'
            name='confirmPassword'
            value={userData.confirmPassword}
            placeholder='Confirm new password'
            handleChange={handleChange}
          />
          <button
            type='submit'
            className='btn btn-block'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default ProfileScreen;
