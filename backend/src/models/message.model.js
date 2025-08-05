import { model, Schema, Types } from "mongoose";
import Usermodel from "./user.model.js";

const messageShcema=new Schema({
    senderId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
     recieverId:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:{
        type:String,
    }
},{timestamps:true})
const message=model("message",messageShcema);
export default message;