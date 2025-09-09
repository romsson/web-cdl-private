import time
import ollama

client = ollama.Client(host="http://localhost:11434")
model = "llama2"
prompt = "What is Python?"

start_time = time.time()
try:
    response = client.generate(model=model, prompt=prompt)
    end_time = time.time()
    elapsed_time = end_time - start_time

    print("\nResponse from Ollama:")
    print(response.response)
    print(f"\nResponse time: {elapsed_time:.2f} seconds")

except Exception as e:
    print("Error communicating with Ollama:", str(e))