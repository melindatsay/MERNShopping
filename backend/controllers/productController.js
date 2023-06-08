import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  const { brand, category, sort, search } = req.query;

  const queryObject = {};
  // add stuff based on condition

  if (brand && brand !== "all brand") {
    queryObject.brand = brand;
  }
  if (category && category !== "all category") {
    queryObject.category = category;
  }
  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }
  // NO AWAIT

  let result = Product.find(queryObject);

  // chain sort conditions

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "price-ascending") {
    result = result.sort("price");
  }
  if (sort === "price-descending") {
    result = result.sort("-price");
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  const totalProducts = await Product.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProducts / limit);

  res.status(200).json({ products, totalProducts, numOfPages });
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// // @desc    Fetch filter and sort products
// // @route   GET /api/products/category/:category
// // @access  Public
// const getFilterSortProduct = asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id)

//   if (product) {
//     res.json(product)
//   } else {
//     res.status(404)
//     throw new Error('Product not found')
//   }
// })

export { getAllProducts, getProduct };
