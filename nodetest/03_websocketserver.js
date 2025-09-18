const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const chatter = require('./MyChatterBot'),
    tunedchatter = require('./MyTunedChatterBot'),
    memorychatter = require('./MyMemoryChatterBot'),
    meteochatter = require('./MyMeteoChatterBot');


// 04 ----------------------- Basic
let mychatterbot = new chatter("llama3.1:8b");

// 05 ----------------------- Tuning 
// let mychatterbot = new tunedchatter("llama3.1:8b");
// mychatterbot.systemPrompt = "Act like Rick from Rick and morty";

// 06 ----------------------- Memory 
// let mychatterbot = new memorychatter("llama3.1:8b");


// 07 ----------------------- Tool and format 
// let mychatterbot = new meteochatter("llama3.1:8b");


const port = 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // Initialize socket.io

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
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});