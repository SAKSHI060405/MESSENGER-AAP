const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 8000;

console.log("Socket server starting...");

io.on('connection', socket => {

    socket.on('new-user-joined', name => {

        socket.username = name;

        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {

        socket.broadcast.emit('receive', {
            message: message,
            name: socket.username
        });

    });

    socket.on('disconnect', () => {

        socket.broadcast.emit('left', socket.username);

    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});