const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatter = require('./MyChatterBot');
const port = 8080;

const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Initialize socket.io

const mychatterbot = new chatter("llama2");

let options = {
    ASCII: true,
    poem: true,
    lang: 'fr'
}

io.on('connection', (socket) => {
    console.log('New user connected');
    
    socket.on('chatmessage', (message) => {
        console.log(message)
        mychatterbot.chat(message).then((answer) => {
            socket.emit('chatanswer', answer);
            console.log(answer);
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Stop my chatterbot and save
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});