## Installer Ollama

Ollama est un outil pour faire tourner des modèles LLM en local (https://ollama.com/). Il permet de télécharger et gérer des modèles, de faire des requêtes via une CLI ou une API REST. On commencera par installer Ollama et faire tourner un modèle LLaMA2 en local (qui est un modèle open-source, simple avec 7B de paramètres).

Pour mac :

> https://ollama.com/download/mac

Pour Windows :

> https://ollama.com/download/windows

Pour Linux : 

dans le terminal :
``` curl -fsSL https://ollama.com/install.sh | sh ```

Une fois Ollama installé, on peut lancer le modèle LLaMA2 (détails du modèle ici https://www.llama.com/llama2/ ). D'autres modèles sont disponibles https://ollama.com/models mais ils prennent plus de place et sont plus lourds (LLaMA2-13B, LLaMA2-70B, etc).

Note: La première execution du modele implique de le telecharger ce qui peut prendre quelques minutes.

> ollama run llama2

Vérifier que le modèle tourne bien en local en ouvrant la page web suivante (sûrement une erreur car pas la bonne requête ou route mais c'est normal). Juste pour vérifier que le serveur est bien lancé sur le port `11434` (port par défaut).

> http://localhost:11434/

Tester un forward sur le modèle LLaMA2 (à faire dans un autre terminal)

> curl http://localhost:11434/api/tags

Tester une requête de génération (à faire dans un autre terminal là encore)

> curl http://localhost:11434/api/generate -d '{
  "model": "llama2",
  "prompt": "Votre prompt ici"
}'

Le modèle devrait répondre avec un JSON.

## 01 Script de test de Ollama `01_ollama_client.js`

Installer le module [ollama](https://www.npmjs.com/package/ollama)
: `npm install ollama`

Un script simple pour se connecter à Ollama et envoyer des prompts sans avoir à re-créer de point d'entrée.

[01_ollama_client.js](01_ollama_client.js)

## 02 Simple server `02_ollama_server.js`

Server recoit des requetes post et les transforme en prompt ollama 
Tester avec curl 
```
curl -X POST http://127.0.0.1:8089/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Write a haiku about servers"}'
```

## 03 Implementation chat websockets - premier chatbot

* Server (dans le quel on charge le modèle) [03_websocketserver.js](03_websocketserver.js)
* Client [03_websocketclient.js](03_websocketclient.js)
* tester requete/reponse ollama 

## 04 Créer une classe dédiée chatbot
* Classe [MyChatterBot](MyChatterBot.js)
* Importer et instancier dans [03_websocketserver.js](03_websocketserver.js)
* jouer avec les prompt custom

## 05 Tuner le modèle 
* Créer une classe [MyTunedChatterBot](MyTunedChatterBot.js) qui herite de MyChatterBot
* ajout de contexte avec les prompts 'system'

## 06 Ajouter de la memoire
* Créer une classe [MyMemoryChatterBot](MyMemoryChatterBot.js) qui hérite de MyChatterBot

## 07 Sauvergarder la memoire 
* Enregistrer la memoire dans un fichier puis la charger au demarrage du chatbot

## 08 Fournir des informations au modèle (tools) 



connecter tool meteo 

sauvegarder historique des mesages

ajouter like au message 


----- front-end ------ ()

page list mes reponses preferrees 


page vis meteo dans mes endroits pref

bouton qui genere et affiche le resultat d'un prompt

|

|

|

groupe de deux, reflexion projet + tit pitch de l'idee 