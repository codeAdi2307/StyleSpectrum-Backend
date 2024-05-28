import mongoose from "mongoose";


const Schema = mongoose.Schema;

const cartSchema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    // totalProductAmount: {
    //   type: Number,
    //   required: true,
    // },
    quantity:{
        type: Number,
        required: true,
    },
    
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price:{
      type: Number,
        required: true,
    },
    originalPrice:{
      type: Number,
        required: true,
    }
    
    
  }, { timestamps: true });
  

  export default mongoose.model("Cart",cartSchema)
  