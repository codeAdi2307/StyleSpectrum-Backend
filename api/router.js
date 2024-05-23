import Express  from "express";

import { viewAllProduct,viewAllCategory,filterCategoryWise,viewParticularProduct,viewAllBanner,userSignUp,userSignIn } from "./contoller.js";
import { adminJwtVerify } from "../middleware/jwtverify.middleware.js";


const apiRouter = Express.Router();


apiRouter.get("/prod",viewAllProduct)
apiRouter.get("/detail",viewParticularProduct)
apiRouter.get("/cat",viewAllCategory)
apiRouter.get("/category",filterCategoryWise)
apiRouter.get("/banners",viewAllBanner)
apiRouter.post("/signup",userSignUp)
apiRouter.post("/signin",userSignIn)



export default apiRouter;