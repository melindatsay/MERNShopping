import express from "express"
const router = express.Router()
import {getAllProducts, getProduct} from "../controllers/productController.js"


// router.get("/", asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// }))

router.route('/').get(getAllProducts)
router.route('/:id').get(getProduct)
export default router