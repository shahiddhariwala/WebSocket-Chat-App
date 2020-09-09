const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;
const app = express();

const router = require('./router');
app.use(router); //middleware

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log("We have a new connection !!!");
    socket.on('disconnect', () => {
        console.log("User had Left!!!");
    })
})


server.listen(PORT, () => {
    console.log(`Server has started running on ${PORT}`);
});
