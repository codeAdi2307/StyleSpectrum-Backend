import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    status:{
        type:String,
        required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  

  export default mongoose.model("Category",categorySchema)
  