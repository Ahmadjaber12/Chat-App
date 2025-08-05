import cloudinary from "../lib/cloudinary.js";
import { comparePassword, generateToken } from "../lib/utils.js";
import Usermodel from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const login=async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password) return res.status(400).json({message:"please enter all the fields"});
    const user=await Usermodel.findOne({email});
    if(user){
        const isUser=await comparePassword(password,user.password);        
        if(isUser | user.password==password){ 
           let token= generateToken(user,res);
            return res.status(200).json(user);
        }
    }
    return res.status(401).json("wrong email or password");
}

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`password in backend is  ${password}`);

  if (!password) throw new Error("Password is required");
  const user = await Usermodel.findOne({ email });
  if (user) return res.status(400).json({ msg: "email already exist" });
  else {
    let hashedPass = await bcrypt.hash(password, 8);
    const newUsr = new Usermodel({ email, password: hashedPass, username });
    if (newUsr) {
      generateToken(newUsr, res);
      await newUsr.save();
      return res.status(201).json(newUsr);
    }
  }
};

export const logout=(req,res)=>{

    res.cookie("token","",{maxAge:0})
    res.status(200).json("logged out successfully");
    

}

export const updateProfile=async(req,res)=>{

  const {profilePic}=req.body;
  if(!profilePic) return res.status(400).json("Please enter the Pic");
  const id=req.user._id
  const uploadedPic=await cloudinary.uploader.upload(profilePic);
  const user=await Usermodel.updateOne({_id:id},{profilePic:uploadedPic.secure_url},{new:true})
  console.log("secureAPI",uploadedPic.secure_url);
  
   res.status(200).json(user);
}

export const checkAuth=(req,res)=>{
  if(req.user)
  return res.status(200).json(req.user)
else{
    return res.status(200).json("Not Authorized");
}
}