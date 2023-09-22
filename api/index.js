import express from "express";
import {createServer} from 'node:http';
import cors from "cors";
import { Server } from "socket.io";
const app=express();
app.use(cors());
const server=createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000"
    }
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
server.listen(9000,()=>{
    console.log("server is running on port 900");
})