import Express  from "express";

import { addCoupon,viewAllCoupon } from "../controller/coupon.cont.js";

const couponRouter = Express.Router();

couponRouter.post("/addcpn",addCoupon)
couponRouter.get("/allcpn",viewAllCoupon)
// couponRouter.get("/oneprod",viewParticularProduct)
// couponRouter.delete("/deletprod",deleteProduct)
// couponRouter.put("/updateprod",updateProduct)






export default couponRouter;