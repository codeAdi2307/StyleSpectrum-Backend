import Express  from "express";
import { cashfree } from "../controller/cashfree.cont.js";

const cashfreeRouter = Express.Router();


cashfreeRouter.post("/pg/orders",cashfree)





export default cashfreeRouter;