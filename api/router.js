import Express  from "express";

import { viewAllProduct,viewAllCategory,filterCategoryWise,viewParticularProduct,viewAllBanner,userSignUp,userSignIn,cartDetails,viewAllCoupon,viewAllBrand,addAddress,viewAllAddress,addOrderDetail,viewParticularAddress,viewParticularOrder,updateOrderStatus,viewAllOrders} from "./contoller.js";
import { adminJwtVerify } from "../middleware/jwtverify.middleware.js";


const apiRouter = Express.Router();


apiRouter.get("/prod",viewAllProduct)
apiRouter.get("/detail",viewParticularProduct)
apiRouter.get("/cat",viewAllCategory)
apiRouter.get("/category",filterCategoryWise)
apiRouter.get("/banners",viewAllBanner)
apiRouter.post("/signup",userSignUp)
apiRouter.post("/signin",userSignIn)
apiRouter.get("/allbrand",viewAllBrand)

apiRouter.post("/cartdetails",cartDetails)
apiRouter.get("/coupons",viewAllCoupon)
apiRouter.post("/address",adminJwtVerify,addAddress)
apiRouter.get("/alladdress",adminJwtVerify,viewAllAddress)
apiRouter.get("/allorders",adminJwtVerify,viewAllOrders)
apiRouter.post("/oneaddress",viewParticularAddress)
apiRouter.post("/orderdetail",adminJwtVerify,addOrderDetail)
apiRouter.post("/orderdetail/:id",adminJwtVerify,updateOrderStatus)
apiRouter.get("/order/:id",viewParticularOrder)







export default apiRouter;