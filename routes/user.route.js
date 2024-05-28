import Express  from "express";

import { userSignUp,userSignIn,viewAllUsers } from "../controller/user.cont.js";
import { adminJwtVerify } from "../middleware/jwtverify.middleware.js";

const userRouter = Express.Router();

userRouter.post("/signup",userSignUp)
userRouter.post("/signin",adminJwtVerify,userSignIn)
userRouter.get("/alluser",viewAllUsers)

export default userRouter;