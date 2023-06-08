import express from "express";
const router = express.Router();
import { protectAuth } from "../middleware/authMiddleware.js";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
} from "../controllers/orderController.js";

// router.get("/", asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// }))

router.route("/").post(protectAuth, addOrderItems);
router.route("/myorders").get(protectAuth, getMyOrders);
router.route("/:id").get(protectAuth, getOrderById);
router.route("/:id/pay").put(protectAuth, updateOrderToPaid);
router.route("/:id/deliver").put(protectAuth, updateOrderToDelivered);
export default router;
