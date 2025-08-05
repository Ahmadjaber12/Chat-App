import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app=express()

const server=http.createServer(app);
const userSocketMap={};
const io=new Server(server,{
    cors:["http://localhost:5173"]
})

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId) 
        userSocketMap[userId]=socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[socket.id]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))

    })
})
export function getReciverSocketId(userId){
    return userSocketMap[userId];
}
export {io,app,server}