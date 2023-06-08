// import React from "react"
// import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
// import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import Message from "../components/Message"
// import { addToCart, removeFromCart } from "../actions/cartActions"

// const CartScreen = () => {
//     const params = useParams()
//     const location = useLocation()
//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const cart = useSelector(state => state.cart)
//     const {cartItems}= cart

//     // const productId = params.id
//     // const qty = Number(new URLSearchParams(location.search).get("qty"))
//     // // const qty = new URLSearchParams(location.search).get("qty") ? Number(new URLSearchParams(location.search).get("qty") ) : 1

//     // useEffect(()=>{
//     //     if(productId){
//     //         dispatch(addToCart(productId, qty))
//     //     }
//     // }, [dispatch, productId, qty])

//     const removeFromCartHandler = (id) => {
//         dispatch(removeFromCart(id))
//     }

//     const checkoutHandler = () => {
//         navigate("/login?redirect=shipping")
//     }

//     return (
//     <Row>

//     <Col md={8}>
//         <h1>Your Shopping Cart</h1>
//         {cartItems.length === 0 ? (<Message>Your cart is empty <Link to="/">Go Shopping</Link></Message>) : (
//         <ListGroup variant="flush">
//             {cartItems.map(item=>(
//                 <ListGroup.Item key={item.productId}>
//                     <Row>
//                         <Col md={2}>
//                             <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col ml={3}>
//                             <Link to={`/product/${item.productId}`}>{item.name}</Link>
//                         </Col>
//                         <Col md={2}>${item.price}</Col>
//                         <Col md={2}>
//                         <Form.Control
//                             as="select"
//                             value={item.qty}
//                             onChange={(e) => dispatch(addToCart(item.productId, Number(e.target.value)))}
//                           >
//                             {[...Array(item.countInStock).keys()].map(
//                               (x) => (
//                                 <option key={x + 1} value={x + 1}>
//                                   {x + 1}
//                                 </option>
//                               )
//                             )}
//                           </Form.Control>
//                         </Col>
//                         <Col md={2}>
//                             <Button type="button" variant="light" onClick={()=>
//                             removeFromCartHandler(item.productId)}>
//                                 <i className="fas fa-trash"></i>
//                             </Button>
//                         </Col>
//                     </Row>
//                 </ListGroup.Item>
//             ))}
//         </ListGroup>
//         )}
//     </Col>
//     <Col md={4}>
//     <Card>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>
//                 Shopping Bag({cartItems.reduce((acc, item) => acc + item.qty, 0)})
//                 items
//               </h2>
//               $
//               {cartItems
//                 .reduce((acc, item) => acc + item.qty * item.price, 0)
//                 .toFixed(2)}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </Button>
//             </ListGroup.Item>
//           </ListGroup>
//         </Card>
//     </Col>
//     </Row>
//   )
// }

// export default CartScreen

import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {
  addToCart,
  removeFromCart,
  changeQuantity,
  calculateTotals,
} from "../features/cart/cartSlice";
import CartItems from "../components/CartItems";

const CartScreen = () => {
  // const params = useParams()
  // const location = useLocation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, totalItems, totalPrice } = cart;
  // const [quantitySelected, setQuantitySelected] = useState(1);

  // const productId = params.id
  // const qty = Number(new URLSearchParams(location.search).get("qty"))
  // // const qty = new URLSearchParams(location.search).get("qty") ? Number(new URLSearchParams(location.search).get("qty") ) : 1

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const removeFromCartHandler = (id) => {
  //     dispatch(removeFromCart(id))
  // }
  // const [currentQuantity, setCurrentQuantity] = useState(item.currentQuantity)
  //   const addToCartHandler = () => {
  //   dispatch(addToCart({product, quantityAdded}))
  //   navigate("/cart")
  // }
  const changeQuantityHandler = (productId, quantitySelected) => {
    // const currentQuantity=e.target.value
    // console.log(value)
    // setQuantitySelected(value)
    // console.log(quantitySelected)
    dispatch(changeQuantity({ productId, quantitySelected }));
    dispatch(calculateTotals());
  };

  const removeFromCartHandler = (itemId) => {
    dispatch(removeFromCart(itemId));
    dispatch(calculateTotals());
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h2>Your Shopping Bag</h2>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <Link to='/' className='text-dark'>
              Continue Shopping
            </Link>
          </Message>
        ) : (
          <CartItems cartItems={cartItems} />
        )}
        {/* <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      className='cart-img'
                    />
                  </Col>
                  <Col ml={3}>
                    <Link to={`/products/${item._id}`} className='text-dark'>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      className='cart-select'
                      as='select'
                      value={item.currentQuantity}
                      onChange={(e) =>
                        changeQuantityHandler(item._id, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
         */}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Total {totalItems} items</h2>

              <h6>$ {totalPrice}</h6>
              {/* {cartItems
                .reduce((acc, item) => acc + item.currentQuantity * item.price, 0)
                .toFixed(2)} */}
            </ListGroup.Item>

            <Button
              type='button'
              className='btn-block btn-dark btn-lg'
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
