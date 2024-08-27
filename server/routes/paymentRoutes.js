import express from "express";
import { checkout } from "../controllers/paymentController.js";
import { verifyPayment } from "../controllers/verifyController.js";

const router = express.Router();

router.route("/payment").post(checkout);
router.route("/verify").post(verifyPayment);

export default router;
