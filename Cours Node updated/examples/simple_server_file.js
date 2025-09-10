const fs = require('fs'), 
    http = require('http');

const server = http.createServer(function (request, response) {
    let sent_header = false

    const stream = fs.createReadStream('htdocs' + request.url);
    stream.setEncoding('utf-8');

    stream.on('error', function (e) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('ERROR 404: Désolée, le document demandé est introuvable...');
        console.log('Il y a eu une erreur chez un client')
        console.log(e);
    });

    stream.on('data', function (data) {
        if (!sent_header) {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            sent_header = true;
        }
        response.write(data);
    });
    stream.on('end', function (data) { response.end(); });
});
server.listen(8080);