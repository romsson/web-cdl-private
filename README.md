# Projet Web CDL (private)

Le but de ce projet est de faire un serveur de forward entre une interface web et un modèle LLaMA2 tournant en local via Ollama.

## Cahier des charges (idées)

- Une page web à la chatGPT
- Choisir un modèle (LLaMA2 pour l'instant)
- Envoyer des prompts
- Afficher les réponses
- Garder le contexte de la conversation
- Faire du streaming (optionnel)
- Faire du fine-tuning / RAG (optionnel)

## Installer Ollama

Télécharger depuis le site web https://ollama.com/

Pour mac :
> https://ollama.com/download/mac

Pour Linux : 

dans le terminal :
``` curl -fsSL https://ollama.com/install.sh | sh ```

Lancer ollama avec le modèle LLaMA2 (détails du modèle ici https://www.llama.com/llama2/ ). D'autres modèles sont disponibles https://ollama.com/models mais ils prennent plus de place.

Note: La première execution du modele implique de le telecharger ce qui peut prendre quelques minutes.
> ollama run llama2

Vérifier que le modèle tourne bien en local en ouvrant la page web suivante (sûrement une erreur car pas la bonne requête ou route mais c'est normal). Juste pour vérifier que le serveur est bien lancé.

> http://localhost:11434/

Tester un forward sur le modèle LLaMA2 (à faire dans un autre terminal)

> curl http://localhost:11434/api/tags

Tester une requête de génération (à faire dans un autre terminal là encore)

> curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Votre prompt ici"
}'

## Serveur de foward

(Code à demander de faire aux élèves)

Utilisation de `BaseHTTPRequestHandler` (doc https://docs.python.org/3/library/http.server.html) pour faire un serveur HTTP simple avec routes et gestion de requêtes. Solution :

> python api_llama2_simple.py

Tester le serveur de forward (à faire dans un autre terminal)

```
curl -X POST http://127.0.0.1:8089/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about servers"}'
```

Voici un exemple de réponse (sûrement à exploiter pour l'interface web)

```json
{
  "model": "llama2",
  "created_at": "2025-09-08T05:32:06.196415Z",
  "response": "In data centers dark\nServers hum with quiet might\nDigital dreams born",
  "done": true,
  "done_reason": "stop",
  "context": [
    518, 25580, 29962, 3532, 14816, 29903, 29958, 5299, 829, 14816,
    29903, 6778, 13, 13, 6113, 263, 447, 18282, 1048, 12424, 518, 29914,
    25580, 29962, 13, 797, 848, 1644, 414, 6501, 13, 1748, 874, 3165, 411,
    11813, 1795, 13, 27103, 12561, 29879, 6345
  ],
  "total_duration": 5964943750,
  "load_duration": 3286103291,
  "prompt_eval_count": 26,
  "prompt_eval_duration": 2181443833,
  "eval_count": 18,
  "eval_duration": 488635417
}
```