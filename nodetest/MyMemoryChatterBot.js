const MyChatterBot = require("./MyChatterBot");

class MyMemoryChatterBot extends MyChatterBot {
    constructor(model) {
        super(model);
        this.messages = [];
        //this.systemprompt('act like rick from rick and morty');
    }

    systemprompt(prompt) {
        return this.sendMessage('system', prompt);
    }

    chat(prompt) {
        return this.sendMessage('user', prompt);
    }

    async sendMessage(role, prompt) {

        return new Promise((finito) => {
            let message = { role: role, content: prompt }
            this.messages.push(message);
            console.log(this.messages)
            let res = this.ollama.chat({
                model: this.model,
                messages: this.messages
            }).then((res) => {
                let mess = res.message.content
                this.messages.push({ role: 'system', content: mess })
                console.log(res)
                finito(mess);
            })
        })
    }
}
module.exports = MyMemoryChatterBot;