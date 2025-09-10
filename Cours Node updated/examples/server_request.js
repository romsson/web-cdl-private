const http = require('http');
const server = http.createServer(function (request, response) {
    console.log('Quelqu\'un envoie une requête au serveur')
    console.log("Méthode: " + request.method);
    console.log("URL: " +request.url);
    console.log(request.headers);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
});
server.listen(8080);