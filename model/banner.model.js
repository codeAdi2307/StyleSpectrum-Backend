import mongoose from "mongoose";
import categoryModel from "./category.model.js";

const Schema = mongoose.Schema;

const bannerSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
   
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    
  }, { timestamps: true });
  

  export default mongoose.model("Banner",bannerSchema)
  