import mongoose from "mongoose";
import categoryModel from "./category.model.js";

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postalCode: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      phonenumber:{
        type:Number,
        require:true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
    
  }, { timestamps: true });
  

  export default mongoose.model("Address",addressSchema)
  