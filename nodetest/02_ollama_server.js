import connect from 'connect'
import {Ollama} from 'ollama';
const app = connect();
const port = 8080;
const ollama_host = "localhost",
    ollama_port = 11434,
    ollama = new Ollama({ host: `http://${ollama_host}:${ollama_port}` });

const model = "llama2"

app.use(function (request, response, next) {
    if (request.method == "POST") {
        if (request.url == "/chat") {
            if (request.headers['content-type'] == 'application/json') {
                response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
                request.on('data', (d) => {
                    let data = JSON.parse(d);
                    new Promise((finito) => {
                        let res = ollama.chat({
                            model: model,
                            messages: [{ role: 'user', content: data.prompt }]
                        })
                        finito(res)
                    }).then((res) => {
                        console.log("answer")
                        response.end(res.message.content)
                    })
                })
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf8' });
                response.end('bad request encoding');
            }
        } else {
            next()
        }
    } else {
        next()
    }
});

app.use(function (request, response) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf8' });
    response.end('erreur 404');
});


app.listen(port);