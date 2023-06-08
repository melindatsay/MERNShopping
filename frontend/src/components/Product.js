import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card border='light' className='product-card h-100'>
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} cariant='top' className='card-img' />
      </Link>

      <Card.Body className='d-flex flex-column justify-content-between'>
        <Link to={`/products/${product._id}`} className='text-center text-dark'>
          <Card.Title as='div'>
            <h6>{product.name}</h6>
            {/* <strong>{product.name}</strong> */}
          </Card.Title>
        </Link>

        <Card.Text as='div' className='my-0'>
          <div className='text-center .smaller'>
            <Rating
              value={product.rating}
              text={` ${product.numReviews} reviews`}
            />
          </div>
        </Card.Text>
        <h6 className='my-0 text-muted text-center'>
          <small>${product.price}</small>
        </h6>
        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
