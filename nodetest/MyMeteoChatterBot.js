const MyMemoryChatterBot = require("./MyMemoryChatterBot");

class MyMeteoChatterBot extends MyMemoryChatterBot {
    constructor(model) {
        super(model);

        this.systempromptstring = `You are an AI Assistant with START, PLAN, ACTION, Observation and Output State.
            Wait for the user prompt and First PLAN using available tools.
            After Planning, Take the action with appropriate tools and wait for Observation based on Action.
            Once you get the Observation, Return the AI response based on START prompt an observations.
            Strictly output format is JSON.
            Available Tools:
            -function getWeatherInfo(location: string): string
            getWeatherInfo is a function that accepts a Location or city name as string and returns the weather info.
            
            Example:
            START
            {"type": "user", "user": "What is the sum of weather of New York and Tokyo?"}
            {"type":"plan", "plan": "I will call the getWeatherInfo for New York"}
            {"type":"action", "function": "getWeatherInfo", "input": "New York"}
            {"type":"observation", "observation": "10°C"}
            {"type":"plan", "plan": "I will call the getWeatherInfo for Tokyo"}
            {"type":"action", "function": "getWeatherInfo", "input": "Tokyo"}
            {"type":"observation", "observation": "20°C"}
            {"type":"output", "output": "The sum of weather of New York and Tokyo is 30°C"}
        `
        this.messages = [
            { role: "system", content: this.systempromptstring },
            { role: "user", content: "what is the weather in New York?" },
            {
                role: 'assistant',
                content: '{"type": "start", "user": "What is the weather in New York?"}'
            },
            {
                role: 'assistant',
                content: `{"type": "plan", "plan": "I will call the getWeatherInfo function with 'New York' as input."}`
            },
            {
                role: 'assistant',
                content: '{"action":"function", "input": "getWeatherInfo", "argument": "New York" }'
            },
            {
                role: 'assistant',
                content: `{"type":"observation", "observation": "10°C"}`
            }
        ]
    }

    getWeatherInfo(location) {
        console.log("function getWeatherInfo called with location:", location);
        if (location.toLowerCase() === 'new york') return '10°C';
        if (location.toLowerCase() === 'san francisco') return '15°C';
        if (location.toLowerCase() === 'tokyo') return '20°C';
        if (location.toLowerCase() === 'london') return '5°C';
        if (location.toLowerCase() === 'paris') return '8°C';
        if (location.toLowerCase() === 'berlin') return '3°C';
        if (location.toLowerCase() === 'sydney') return '25°C';
        if (location.toLowerCase() === 'delhi') return '30°C';
        return 'Unknown location';
    }

    chat(prompt) {
        return new Promise((done) => {
            const q = { type: "user", user: prompt };
            this.messages.push({ role: "user", content: JSON.stringify(q) });
            this.sendMessage().then(res => {
                console.log("returning")
                done(res);
            });
        })
    }

    async sendMessage() {
        return new Promise((IAresult) => {
            console.log(this.messages)
            let req = this.ollama.chat({
                model: this.model,
                messages: this.messages,
                format: 'json'
            }).then((res) => {
                const result = res.message.content;
                this.messages.push({ role: "assistant", content: result });

                console.log(`\n\n------------------Output Start AI------------------\n`);
                console.log(result);
                console.log(`\n------------------Output End AI--------------------\n\n`);

                const call = JSON.parse(result);

                if (call.type === "output") {
                    console.log("✅ Final Output:", call.output);
                    IAresult(call.output);
                } else if (call.type === "action") {
                    const fn = this.getWeatherInfo;
                    const observation = fn(call.input);
                    console.log("using " + fn)
                    const obs = { type: "observation", observation };
                    this.messages.push({ role: "assistant", content: JSON.stringify(obs) });
                    IAresult(this.sendMessage())
                }
                else if (!call.type) {
                    console.warn("⚠️ Unexpected format:", res);
                    IAresult(res);
                }
                else {
                    IAresult(this.sendMessage())
                }
            })
        })

    }
}
module.exports = MyMeteoChatterBot;