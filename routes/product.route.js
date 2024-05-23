import Express  from "express";

import { addProduct,viewAllProduct,viewParticularProduct,deleteProduct,updateProduct } from "../controller/product.cont.js";

const productRouter = Express.Router();

productRouter.post("/addprod",addProduct)
productRouter.get("/allprod",viewAllProduct)
productRouter.get("/oneprod",viewParticularProduct)
productRouter.delete("/deletprod",deleteProduct)
productRouter.put("/updateprod",updateProduct)






export default productRouter;