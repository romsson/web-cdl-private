import ollama from 'ollama'

const model = "llama2"
let prompt = "Hello"

let start_time = Date.now();

try {
    const response = await ollama.chat({
        model: model,
        messages: [{ role: 'user', content: prompt }]
    })
    let end_time = Date.now();
    let elapsed_time = end_time - start_time;

    console.log("Response from "+ model + ":")
    console.log(response.message.content)
    console.log(`Response time: ${elapsed_time / 1000} seconds`)
} catch (e) {
    console.log(e);
}