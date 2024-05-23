import Express  from "express";
// import { userRegister,userLogin} from "../controller/admin.controller.js";
// import { verifyToken,verifyTokenAndAuth } from "../controller/verify.token.js";
import { adminSignUp,adminSignIn } from "../controller/admin.cont.js";
import { adminJwtVerify } from "../middleware/jwtverify.middleware.js";
const adminRouter = Express.Router();

adminRouter.post("/signup",adminSignUp)
adminRouter.post("/signin",adminJwtVerify,adminSignIn)
// userRouter.post("/login",userLogin)
// userRouter.put("/:id",verifyToken,verifyTokenAndAuth)





export default adminRouter;