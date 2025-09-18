class MyChatterBot {
    constructor(model) {
        console.log("hi I am your custom LLama interface running " + model)
        this.model = model;
        this.ollama_host = "localhost";
        this.ollama_port = 11434;
        const { Ollama } = require('ollama');
        this.ollama = new Ollama({ host: `http://${this.ollama_host}:${this.ollama_port}` });
        this.context = [];
    }

    async chat(prompt) {
        return new Promise((finito) => {
            let res = this.ollama.chat({
                model: this.model,
                messages: [{ role: 'user', content: prompt }]
            }).then((res) => {
                let mess = res.message.content
                console.log(res)
                finito(mess);
            })
        })
    }

    async describe() {
        return new Promise((done) => {
            this.ollama.show({
                model: this.model
            })
        })
    }
}
module.exports = MyChatterBot