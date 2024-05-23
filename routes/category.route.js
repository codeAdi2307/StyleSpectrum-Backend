import Express  from "express";

import { addCategory,deleteCategory,updateCategory,viewAllCategory,viewParticularCategory } from "../controller/category.cont.js";

const categoryRouter = Express.Router();

categoryRouter.post("/addcat",addCategory)
categoryRouter.get("/allcat",viewAllCategory)
categoryRouter.get("/onecat",viewParticularCategory)
categoryRouter.delete("/deletecat",deleteCategory)
categoryRouter.put("/updatecat",updateCategory)






export default categoryRouter;