import { model, Schema, Types } from "mongoose";

const User=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps:true})
const Usermodel=model("User",User);
export default Usermodel;