const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());

io.on("connection",(socket)=>{
    console.log("Connection is on Bitch!");
    console.log(socket.id, " has joined");
    socket.on("/test",(msg)=>{
        console.log(msg);
    })
});

server.listen(port,"0.0.0.0",()=>{
    console.log("Sever is on Bitch!");
})