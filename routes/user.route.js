import Express  from "express";
import { userSignUp,userSignIn } from "../controller/user.cont.js";

import { adminJwtVerify } from "../middleware/jwtverify.middleware.js";

const userRouter = Express.Router();

userRouter.post("/signup",userSignUp)
userRouter.post("/signin",adminJwtVerify,userSignIn)

export default userRouter;