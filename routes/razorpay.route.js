import Express  from "express";
import { createOrder,verifyPayment } from "../controller/razorpay.cont.js";

const razorpayRouter = Express.Router();


razorpayRouter.post("/v1/orders",createOrder)
razorpayRouter.get("/v1/orders/:id",verifyPayment)





export default razorpayRouter;