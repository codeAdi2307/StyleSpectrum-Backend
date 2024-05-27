import mongoose from "mongoose";
import categoryModel from "./category.model.js";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  size: [String],
  color: [String],
  imageUrl: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  discount: {
    type: Boolean
  },
  newArrivals: {
    type: Boolean
  },
  bestSales: {
    type: Boolean
  },
  status: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  }

}, { timestamps: true });


export default mongoose.model("Product", productSchema)
