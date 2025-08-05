import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";   
import { useStore } from './useAuthStore';
export const useChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
                const res=await axiosInstance.get("/messages/users");
                set({users:res.data});

        } catch (error) {
                console.log(error);
                toast.error(`error while getting active users ${error}`);
    }
    finally{
        set({isUsersLoading:false})
    }
},
getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});

        } catch (error) {
            toast.error(`error while fetching messages ${error}`)
        }finally{
          set({isMessagesLoading:false})
        }
},
setSelectedUser:(selectedUser)=>{
    set({selectedUser})
},
sendMessages:async(messageData)=>{
    const {selectedUser,messages}=get();
    try {
        const res=await axiosInstance.post(`/messages/${selectedUser._id}`,messageData);
        set({messages:[...messages,res.data]});

    } catch (error) {
        toast.error(`error occured while sending the message ${error}`);
        
    }
},
subiscripeToMessages:()=>{
    const {selectedUser}=get();
    if(!selectedUser)return;
    const socket=useStore.getState().socket;

    socket.on("newMessage",(newMessages)=>{
        if(newMessages.senderId!==selectedUser._id) return;
        set({messages:[...get().messages,newMessages]})
    })
},
unsubiscripeFromMessages:()=>{
    const socket=useStore.getState().socket;
    socket.off("newMessage")

}}));