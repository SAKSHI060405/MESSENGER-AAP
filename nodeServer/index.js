//node server which will handle socket io connections
const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
console.log("Socket server running on port 8000");

const users = {};

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

    socket.on('disconnect',message => {

        socket.broadcast.emit('left', socket.username);

    });

});
