const express = require('express')
    , app = express();

app.get('/', function (req, res, next) {
    res.send('Welcome to the website !');
});
app.get('/*splat', express.static(__dirname + '/htdocs')); // documents statiques
app.get('/user/:id', function (req, res, next) {
    res.send('Hello ' + req.params.id + ' !');
});

app.post('/*splat', function (req, res) {
    // POST *
    res.send('POST request to ' + req.originalUrl);
});

app.get('/*splat', function (req, res) {
    // rien de tout ça...
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf8' });
    res.end('Désolé, le document demandé est introuvable...');
});
app.listen(8080);