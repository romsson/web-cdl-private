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

```js
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
```

Simple server 

implementation chat websockets

classe chatbot

jouer avec les prompt custom et se rendre compte que sans memoire c'est limité



Ajouter des templates: chaque template est propre au modele / a la maniere dont il a ete entrainé 

template pour llama2 :
```
<s>[INST] <<SYS>>
{{ system_prompt }}
<</SYS>>

{{ user_message }} [/INST]
```






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