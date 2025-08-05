import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const generateToken=(user,res)=>{

    const token=jwt.sign({id:user._id.toString()},process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    res.cookie("token",token,{
        maxAge:7*24*60*60*1000,
        httponly:true,
        samesite:"strict"
    })
    return token;
}

export const comparePassword=async(password,hashedPass)=>{
    const verified=await bcrypt.compare(password,hashedPass)
    console.log(verified);
    
    if(verified)
        return true
    else
    return false
}