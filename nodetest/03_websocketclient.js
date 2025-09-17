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
        let promptwords = prompt.split(" ");
        switch (promptwords[0]) {
            case "draw":
                promptwords.splice(0, 1);
                let drawtopic = promptwords.join(" ");
                io.emit('chatmessage', "make a complex ascii art drawing, without using emoji,  representing: "+ drawtopic + ". only answer with the drawing; no more words and it must not be an emoji");
                break;
        
            default:
                io.emit('chatmessage', prompt);
                break;
        }
        rl.close();
    });
}

doChat();