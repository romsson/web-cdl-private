const connect = require('connect')
    , static_pages = require('serve-static') // npm install serve-static
    , app = connect()
        .use(static_pages('htdocs'))
        // middleware de gestion de pages statiques
        .use(function (request, response) { // middleware maison pour gestion 404
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf8' });
            response.end('Désolé, le document demandé est introuvable...');
        })
    ;
app.listen(8080);