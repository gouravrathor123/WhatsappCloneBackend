const express = require("express");
const { copyFileSync } = require("fs");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());
var clients = {};

io.on("connection",(socket)=>{
    console.log("Connection is on Bitch!");
    console.log(socket.id, " has joined");
    socket.on("signin",(id)=>{
        console.log(id);
        clients[id]=socket;
        console.log(clients);
    });
    socket.on("message",(msg)=>{
        console.log(msg);
        let targetId=msg.targetId;
        if(clients[targetId]){
            clients[targetId].emit("message",msg);
        }
    });
});

server.listen(port,"0.0.0.0",()=>{
    console.log("Sever is on Bitch!");
})