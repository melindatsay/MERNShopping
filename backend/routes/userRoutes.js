import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protectAuth } from "../middleware/authMiddleware.js";

// router.get("/", asyncHandler(async (req, res) => {
//     const products = await Product.find({})
//     res.json(products)
// }))

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router
  .route("/profile")
  .get(protectAuth, getUserProfile)
  .put(protectAuth, updateUserProfile);
// router
//   .route("/shipping")
//   .get(protectAuth, getUserProfile)
//   .put(protectAuth, updateUserProfile);

export default router;
