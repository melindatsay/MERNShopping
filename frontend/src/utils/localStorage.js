export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addPaymentMethodToLocalStorage = (paymentMethod) => {
  localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
};

export const removePaymentMethodFromLocalStorage = () => {
  localStorage.removeItem("paymentMethod");
};

export const getPaymentMethodFromLocalStorage = () => {
  const result = localStorage.getItem("paymentMethod");
  const paymentMethod = result ? JSON.parse(result) : {};
  return paymentMethod;
};
