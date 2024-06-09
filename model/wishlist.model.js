import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
  
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 


}, { timestamps: true });


export default mongoose.model("Wislist", wishlistSchema)
