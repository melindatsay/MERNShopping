import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingScreen from "./screens/LandingScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import NotFoundScreen from "./screens/NotFoundScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<LandingScreen />} exact />
            <Route path='/login' element={<RegisterScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/myorders' element={<MyOrdersScreen />} />
            <Route path='/products' element={<ProductListScreen />} />
            <Route
              path='/products/category/:id'
              element={<ProductListScreen />}
            />
            <Route path='/products/brand/:id' element={<ProductListScreen />} />
            <Route path='/products/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />}>
              <Route path='/cart/:id' element={<CartScreen />} />
            </Route>
            {/* <Route path='/search/:keyword' element={<LandingScreen />} /> */}
            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
