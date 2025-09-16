class MyChatterBot {
    constructor(model) {
        console.log("hi I am your custom LLama interface running " + model)
        this.model = model;
        this.ollama_host = "localhost";
        this.ollama_port = 11434;
        const { Ollama } = require('ollama');
        this.ollama = new Ollama({ host: `http://${this.ollama_host}:${this.ollama_port}` });
    }

    chatWithOptions(options, prompt) {
        let finalPrompt = prompt;
        if (options.lang == "fr") {
            finalPrompt +=" \n  write the answer in french"
        }
        else if (options.lang == "jp") {
            finalPrompt +=" \n  write the answer in japanese"
        }
        if (options.poem) {
            finalPrompt +=" \n  your answer must take the form of a poem"
        }
        if (options.ASCII) {
            finalPrompt +=" \n  finish the answer with a drawing in ascii art"
        }

        return this.chat(finalPrompt);
    }

    async chat(prompt) {
        return new Promise((finito) => {
            console.log(prompt)
            let res = this.ollama.chat({
                model: this.model,
                messages: [{ role: 'user', content: prompt }]
            }).then((res) => {
                let mess = res.message.content
                finito(mess);
            })
        })
    }

    saveInHistory(prompt, answer) {
        console.log("saving in history");
    }

    loadHistory() {
        console.log("loading history");
    }

    askmeteo(infos) {

    }

    askreceipe(aliments) {

    }
}
module.exports = MyChatterBot