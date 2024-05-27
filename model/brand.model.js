import mongoose from "mongoose";

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    status:{
        type:String,
        required: true,
    }
  }, { timestamps: true });
  

  export default mongoose.model("Brand",brandSchema)
  