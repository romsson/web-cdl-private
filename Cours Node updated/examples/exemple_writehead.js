const http = require('http');
const server = http.createServer(function (request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Server': 'node.js cousu main',
        'Cache-Control': 'no-store'
    });
    response.end('hello, world');
});
server.listen(8080);