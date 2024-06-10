import express from "express";
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

import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

// For Admin Panel
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/prod", productRouter);
app.use("/api/cat", categoryRouter);
app.use("/api/bann", bannerRouter);
app.use("/api/brand", brandRouter);
app.use("/api/cpn", couponRouter);

// For Web Api
app.use("/api", apiRouter);

// for payment gateway
app.use(cashfreeRouter);
app.use(razorpayRouter);

async function connection() {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8001, () => {
      console.log("Listening to server and connected to db");
    });
  } catch (error) {
    console.error("Problem with the code running:", error);
    process.exit(1); // Exit the process with failure
  }
}

connection();

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong in some controller");
});
