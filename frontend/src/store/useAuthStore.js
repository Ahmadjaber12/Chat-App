import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"
import io from 'socket.io-client'

const base_URL="http://localhost:3000"
export const useStore=create((set,get)=>({

    authUser:null,
    isLoggingIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    checkAuth:async()=>{
        try {
            const response=await axiosInstance.get("/auth/check");
            set({authUser:response.data});
            get().connectSocket()

        } catch (error) {
                console.log(error);
                         
        }
    },
    signUp:async(data)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data})
            toast.success("Account created successfully")
            get().connectSocket()

        } catch (error) {
            console.log(error);
             toast.error(error.response.data.message);

        }
        finally{
            set({isSigningUp:false});
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
                console.log(error);
                toast.error("error while logout",error)
        }

    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in Successfully")
            get().connectSocket()
        } catch (error) {
            console.log(error);
            toast.error(`invalid credentials`);
        }finally{
            set({isLoggingIn:false})
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/profiles",data)
            set({authUser:res.data})
            toast.success(" Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error(`an error occured while uploading picture ${error}`);
            
        }finally{
            set({isUpdatingProfile:false});
        }
    },
    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return;
        const socket=io(base_URL,{
            query:{userId:authUser._id}
        })
        socket.connect()
        set({socket})
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected ) get().socket.disconnect();
    }

}))