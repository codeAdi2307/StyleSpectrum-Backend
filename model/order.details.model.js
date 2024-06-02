import mongoose from "mongoose";
import categoryModel from "./category.model.js";

const Schema = mongoose.Schema;

const orderDetailSchema = new Schema({
 
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coupon:{
    type: Schema.Types.ObjectId,
    ref: 'Coupon',
  },
  amount:{
    type: Number,
    required: true
  },
  amount_with_tax:{
    type: Number,
  },
  product:{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  address:{
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  payment_status:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  },
}, { timestamps: true });


export default mongoose.model("OrderDetail", orderDetailSchema)
