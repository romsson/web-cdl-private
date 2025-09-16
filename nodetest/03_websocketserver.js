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

mychatterbot.chat('hello !').then((answer) => {
    console.log(answer);
    
    mychatterbot.chatWithOptions(options, " What'sup ? ").then((answer) => {
        console.log(answer);
    });
});


io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', { from: 'Server', text: 'Welcome!', createdAt: Date.now() });

    socket.on('createMessage', (message) => {
        console.log('New message:', message);
        io.emit('newMessage', message); // Send to everyone
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});