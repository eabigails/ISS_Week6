const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
    });

    socket.on("message", (data) => {
        let { from, username, message, hash } = data;
        console.log(`Received message from ${username}: ${message}`);
        console.log(`Received hash: ${hash}`);

        
        message = message + " (tampered by malicious server)";
        hash = "fakehash"; 
        
        io.emit("message", { from, username, message, hash });
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
