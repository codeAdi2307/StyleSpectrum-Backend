import Express from "express";
import mongoose from "mongoose";

import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";
import bannerRouter from "./routes/banner.route.js";
import brandRouter from "./routes/brand.router.js";
import couponRouter from "./routes/coupon.route.js";
import cashfreeRouter from "./routes/cashfree.route.js";
import razorpayRouter from "./routes/razorpay.route.js";


import apiRouter from "./api/router.js";


import Dotenv  from "dotenv";
import cors from "cors";

const app = Express();
Dotenv.config();

app.use(Express.json())
app.use(cors())

// For Admin Panel
app.use("/api/admin",adminRouter)
app.use("/api/user",userRouter)
app.use("/api/prod",productRouter)
app.use("/api/cat",categoryRouter)
app.use("/api/bann",bannerRouter)
app.use("/api/brand",brandRouter)
app.use("/api/cpn",couponRouter)

// For Web Api
app.use("/api",apiRouter)

// for payment gateway
app.use(cashfreeRouter)
app.use(razorpayRouter)

function connection() {
  try {
    const connectDb = async function () {
      const connect = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
      if (connect) {
        app.listen(process.env.PORT || 3001, () => {
          console.log("Listening to server and connected to db");
        });
      } else {
        throw new Error("Not connected to Db");
      }
    };
    connectDb();
  } catch (error) {
    console.error("Problem with the code running:", error.message);
  }
}

connection();

app.use((err,req,res,next)=>{
  console.log(err);
  res.send("Something wrong in some controller")
})
