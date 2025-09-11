const www_auth = { 'WWW-Authenticate': 'Basic realm="Zone à accès restreint"' }
const send401 = function (res) { res.writeHead(401, www_auth); res.end() };
const static_pages = require('serve-static');
function basic_auth(req, res, next) {
    var auth = require('basic-auth')
        // npm install basic-auth
        , credentials = auth(req)
        ;
    if (!credentials) send401(res);
    else if (credentials.name != 'root' || credentials.pass != 'password') {
        // en cas de tentative ratée on ajoute une temporisation
        console.log("mauvais login ou mot de passe");
        setTimeout(send401, 5000, res);
    }
    else next();
}

const connect = require('connect'),
    app = connect()
        .use(basic_auth)
        .use(static_pages('htdocs')).use(function (request, response) {
            if (request.url == "/reset") {
                send401(response);
            } else {
                response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf8' });
                response.end('Désolé, le document demandé est introuvable...');
            }
        })

app.listen(8080);