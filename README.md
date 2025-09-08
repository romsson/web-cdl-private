# Projet Web CDL (private)


## Installer Ollama

Download from https://ollama.com/

For mac

> https://ollama.com/download/mac

Lancer ollama avec le modèle llama2 (détails ici https://www.llama.com/llama2/ )

> ollama run llama2

Vérifier que le modèle tourne bien en local en ouvrant

> http://localhost:11434/

Tester un forward sur le modèle

> curl http://localhost:11434/api/tags

Tester une commande

> curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Hello from Telegram bot!"
}'

## Server de foward

Utilisation de `BaseHTTPRequestHandler` (doc https://docs.python.org/3/library/http.server.html)

> python api_llama2_simple.py


Tester le serveur

```
curl -X POST http://127.0.0.1:8089/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about servers"}'
```

Voici un exemple de réponse

{"model": "llama2", "created_at": "2025-09-08T05:32:06.196415Z", "response": "In data centers dark\nServers hum with quiet might\nDigital dreams born", "done": true, "done_reason": "stop", "context": [518, 25580, 29962, 3532, 14816, 29903, 29958, 5299, 829, 14816, 29903, 6778, 13, 13, 6113, 263, 447, 18282, 1048, 12424, 518, 29914, 25580, 29962, 13, 797, 848, 1644, 414, 6501, 13, 1748, 874, 3165, 411, 11813, 1795, 13, 27103, 12561, 29879, 6345], "total_duration": 5964943750, "load_duration": 3286103291, "prompt_eval_count": 26, "prompt_eval_duration": 2181443833, "eval_count": 18, "eval_duration": 488635417}%  