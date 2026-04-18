import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    items : [
        {
            itemId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required:true
            },
            quantity:{
                type: Number,
                default:1
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
},{ timestamps: true })


export const Cart = mongoose.model("Cart", cartSchema)