import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId, io } from "../lib/socket.js";
import message from "../models/message.model.js";
import Usermodel from "../models/user.model.js";

export const getUsersForSidebar=async(req,res)=>{

    const loggerinUserId=req.user._id;

    const filteredUsers=await Usermodel.find({_id:{$ne:loggerinUserId}}).select("-password");

    res.status(200).json(filteredUsers);

}
export const getMessages=async(req,res)=>{
    const {id:userToChatId}=req.params;
    const  myId=req.user._id;

    const messages=await message.find({
        $or:[{recieverId:userToChatId,senderId:myId},{recieverId:myId,senderId:userToChatId}]})

    return res.status(200).json(messages)
    }
export const sendMessages=async(req,res)=>{
    const {text,image}=req.body;
    const {id:recieverId}=req.params;
    const senderId=req.user._id;

    let imageUrl;

    if(image){
        const uploadedPic=await cloudinary.uploader.upload(image);
        imageUrl=uploadedPic.secure_url;
    }

    const newMessage=new message({
        senderId,
        recieverId,
        text,
        image:imageUrl 
    });
    await newMessage.save();
    const recieverIdSocketId=getReciverSocketId(recieverId);
    if(recieverIdSocketId){
        io.to(recieverIdSocketId).emit("newMessage",newMessage)
    }
    return res.status(201).json(newMessage);
}
