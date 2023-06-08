import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    // shippingAddress: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   postalCode: "",
    //   country: "",
    // },
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    // shippingAddress: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   postalCode: "",
    //   country: "",
    // },
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@example.com",
    // shippingAddress: {
    //   address: "",
    //   city: "",
    //   state: "",
    //   postalCode: "",
    //   country: "",
    // },
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
