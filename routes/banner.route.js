import Express  from "express";

import { addBanner,deleteBanner,updateBanner,viewAllBanner,viewParticularBanner } from "../controller/banner.cont.js";

const bannerRouter = Express.Router();

bannerRouter.post("/addbann",addBanner)
bannerRouter.get("/allbann",viewAllBanner)
bannerRouter.get("/onebann",viewParticularBanner)
bannerRouter.delete("/deletbann",deleteBanner)
bannerRouter.put("/updatebann",updateBanner)



export default bannerRouter;