import Express  from "express";

import { addBrand,viewAllBrand,viewParticularBrand,deleteBrand,updateBrand } from "../controller/brand.cont.js";

const brandRouter = Express.Router();

brandRouter.post("/addbrand",addBrand)
brandRouter.get("/allbrand",viewAllBrand)
brandRouter.get("/onebrand",viewParticularBrand)
brandRouter.delete("/deletebrand",deleteBrand)
brandRouter.put("/updatebrand",updateBrand)






export default brandRouter;