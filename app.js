const express = require('express')
const app = express()
const { Server } = require("socket.io");
const {createServer} = require('http');
const path = require('path');
const server = createServer(app)
const io = new Server(server)



app.use(express.static('public'));
app.set("view engine","ejs")
// app.set(express.static(path.join(__dirname , "/public")))


app.get("/",(req,res)=>{
    return res.render("main")
})
io.on("connection",(socket)=>{
    console.log( socket.id +  "Joined the room");
    socket.on("send-location",(data)=>{
       io.emit("received-location",{id:socket.id,...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id)
    })
})

server.listen(8000,()=>console.log("Port is live on 8000"));