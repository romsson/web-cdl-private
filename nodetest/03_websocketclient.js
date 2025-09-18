const socketIO = require("socket.io-client");
const io = socketIO('http://localhost:8080');
const readline = require('node:readline');

io.on('chatanswer', (e) => {
    console.log(e);
    doChat();
})

function doChat() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(`Ask something: `, prompt => {
        io.emit('chatmessage', prompt);
        rl.close();
    });
}

doChat();