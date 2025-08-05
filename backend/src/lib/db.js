import mongoose from 'mongoose'

export const connection=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to MongDB");

    } catch (error) {
        console.log("MongoDB Error",error);
        
    }

}