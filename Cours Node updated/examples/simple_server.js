const http = require('http');
const server = http.createServer( function(request, response) {
    html = '<!DOCTYPE html><pre>';
    html += "<h1> Bonjour </h1> <p>Le client a demandé l'url:" + request.url + "</p>"
    request.on('data', function(datacontent) {
        html += datacontent;
        console.log('[DATA] ' + datacontent + "\n");
    });

    request.on('end', function(data) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(html + "</pre>");
        response.end();
    });
});
server.listen(8080);