# Projet Web CDL (private)

Le but de ce projet est de faire un serveur de forward entre une interface web et un modèle LLaMA2 tournant en local via Ollama.

## Cahier des charges (idées)

- Une page web à la chatGPT
- Choisir un modèle (LLaMA2 pour l'instant)
- Envoyer des prompts
- Afficher les réponses, stats et autres modèles disponibles
- Garder le contexte de la conversation
- Faire du streaming (optionnel)
- Faire du fine-tuning / RAG (optionnel)

## Installer Ollama

Ollama est un outil pour faire tourner des modèles LLM en local (https://ollama.com/). Il permet de télécharger et gérer des modèles, de faire des requêtes via une CLI ou une API REST. On commencera par installer Ollama et faire tourner un modèle LLaMA2 en local (qui est un modèle open-source, simple avec 7B de paramètres).

Pour mac :

> https://ollama.com/download/mac

Pour Windows :

> https://ollama.com/download/windows

Une fois Ollama installé, on peut lancer le modèle LLaMA2 (détails du modèle ici https://www.llama.com/llama2/ ). D'autres modèles sont disponibles https://ollama.com/models mais ils prennent plus de place et sont plus lourds (LLaMA2-13B, LLaMA2-70B, etc).

> ollama run llama2

Vérifier que le modèle tourne bien en local en ouvrant la page web suivante (sûrement une erreur car pas la bonne requête ou route mais c'est normal). Juste pour vérifier que le serveur est bien lancé sur le port `11434` (port par défaut).

> http://localhost:11434/

Tester un forward sur le modèle LLaMA2 (à faire dans un autre terminal)

> curl http://localhost:11434/api/tags

Tester une requête de génération (à faire dans un autre terminal là encore)

> curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Votre prompt ici",
}'

Le modèle devrait répondre avec un JSON.

## 01 Script de test de Ollama `01_ollama_client.py`

Un script simple pour se connecter à Ollama et envoyer des prompts sans avoir à re-créer de point d'entrée. Pour cela on utilise le module `ollama` (https://pypi.org/project/ollama/) qui permet de faire des requêtes plus facilement (mais il faut l'installer).

### Using `venv` (recommended)

1. **Create a virtual environment:**

```bash
python -m venv venv
```

2. **Activate the environment:**

* On macOS/Linux:

```bash
source venv/bin/activate
```
* On Windows:

```bash
venv\Scripts\activate
```

3. **Install the module:**

```bash
pip install ollama
```

Et lancer le script:

```bash
python test_ollama_client.py
```

Le script devrait afficher la réponse du modèle en JSON.

## 02 Serveur de foward

Cette fois un server un peu plus avancé que juste un script de test. Utilisation de `BaseHTTPRequestHandler` (doc https://docs.python.org/3/library/http.server.html) pour faire un serveur HTTP simple avec routes et gestion de requêtes.

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

## 03 Script de test de Ollama `03_ollama_server_stats.py`

Un script cette fois pour se connecter à Ollama et récupérer les stats du serveur. Ces stats sur le modèle permettent de connaître ses propriétés (taille, licence, etc). Utile pour faire une interface web plus complète.

```json
{
  "license": "LLAMA 2 Community License",
  "modelfile": "...",
  "parameters": "7B",
  "template": "...",
  "families": ["llama"]
}
```

C'est équivalent à faire la requête suivante en `curl` :

```
curl http://localhost:11434/api/show -d '{"model": "llama2"}'
```

➡️ Idéalement demander aux étudiants de rajouter une route `/stats` dans le serveur de forward pour récupérer ces statistiques. Egalement rajouter une route `/models` pour lister les modèles disponibles (via la route `GET /api/models` de Ollama).

## 04 Lister tous les modèles disponibles

