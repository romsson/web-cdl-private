const express = require('express')
  , app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/ioclient.html');
});

io.sockets.on('connection', function (socket) {
  // réception événément 'connection'
  socket.emit('hello', { 'this': 'is my data' }); // émission événement 'hello'
});

server.listen(8080);