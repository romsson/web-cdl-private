const MyChatterBot = require("./MyChatterBot");

class MyTunedChatterBot extends MyChatterBot {
    constructor(model) {
        super(model);
        this.systemPrompt = "";
    }

    async chat(prompt) {
        return new Promise((finito) => {
            let messages = [];
            if (this.systemPrompt) {
                messages.push({ role: 'system', content: this.systemPrompt });
            }
            messages.push({ role: 'user', content: prompt })

            let res = this.ollama.chat({
                model: this.model,
                messages: messages
            }).then((res) => {
                let mess = res.message.content
                console.log(res)
                finito(mess);
            })
        })
    }
}
module.exports = MyTunedChatterBot;