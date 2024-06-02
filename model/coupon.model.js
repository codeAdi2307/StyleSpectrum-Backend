import mongoose from "mongoose";
import categoryModel from "./category.model.js";

const Schema = mongoose.Schema;

const couponSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    validity: {
        type: String,
        required: true,
    },
    mincartvalue: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: false,
    },

    coupontype: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Pre-save middleware to sanitize data
// couponSchema.pre('save', function (next) {
//     if (Array.isArray(this.category) && this.category.length === 1 && this.category[0] === '') {
//         this.category = null;
//     }
//     if (Array.isArray(this.user) && this.user.length === 1 && this.user[0] === '') {
//         this.user = null;
//     }
//     next();
// });

export default mongoose.model("Coupon", couponSchema);
