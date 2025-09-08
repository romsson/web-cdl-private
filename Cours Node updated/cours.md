# Node.js
Cours node.js Daniel Muller - revision 2025
* Rearrangement de l'ordre de certaines choses
* Mise a jour des exemples (var > const/let)
* Ajout d'informations sur le package manager: le dossier node_modules, package.json 

## 1. Introduction
### Description
[Node.js](https://nodejs.org/en/) est un framework Javascript côté serveur créé en 2009 par Ryan Dahl, qui s'appuie sur la machine virtuelle [V8 engine](https://v8.dev/docs) développée par Google pour Chrome, elle-même publiée en open source fin 2008.

Node.js a été conçu dès le départ autour d'une boucle de gestion d'événements asynchrones, et un [mécanisme d'entrées/sorties non bloquantes](https://en.wikipedia.org/wiki/Asynchronous_I/O), ce qui rend le framework extrêmement performant en termes de montée en charge.

Il intègre un mécanisme qui permet de limiter la portée des variables en isolant le code dans des [modules](http://wiki.commonjs.org/wiki/Modules/1.0) et possède un système de gestion de bibliothèques contribuées très bien alimenté par la communauté [npm](https://www.npmjs.org/).

Il existe de nombreux modules pour l'accès aux fichiers, au réseau, aux bases de données ([SQL ou NoSQL](https://www.geeksforgeeks.org/sql/difference-between-sql-and-nosql/)), et le développement d'applications web.

Parmi ceux-là on s'intéressera tout particulièrement aux modules [express](https://expressjs.com/), un framework d'application web, et socket.io qui met la technologie des WebSockets à la portée de tous les navigateurs.

### Installation
Pour installer Node.js il faut se rendre à l'adresse :
> https://nodejs.org/en/download/

Télécharger le produit adapté à sa plateforme, puis suivre les instructions.

#### Hello World
Pour tester l'installation de node, on peut entrer dans le terminal la commande suivante qui donne la version de node installée: 
``` 
node -v
``` 
puis créer un fichier javascript [helloworld.js](examples/helloworld.js) contenant la ligne :

```
console.log('hello, world');
```

et l'exécuter avec node:
``` 
node helloworld.js 
```

#### Exemple de serveur
L'un des points marquants de Node.js est que le framework intègre directement les fonctionnalités de communication via divers protocoles réseau. Le développement d'une application web ne nécessite donc pas de serveur web supplémentaire.

Voici par exemple un serveur web répondant "hello, world" quelle que soit la ressource demandée :

[helloserver.js](examples/helloserver.js)
```
const server = require('http').createServer( function(req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end("hello, world\n");
});
server.listen(8080);
console.log('Adresse du serveur: http://localhost:8080/');
```

Executer ce fichier et ouvrir le navigateur à l'adresse http://localhost:8080/

Pour arreter le processus, entrer ctrl+c dans le terminal

### npm - Node Package Manager
Node.js est nativement accompagné d'un outil pour gérer les modules donnant accès à la grande majorité de ses fonctionnalités: [Node Package Manager (npm)](https://www.npmjs.com/).

Cet outil, est à la fois :
* un dépôt de modules fournis par la communauté,
* un logiciel pour gérer les modules installés sur une machine donnée (la vôtre),
* un standard permettant d'exprimer les dépendances entre application et modules.

#### package.json et node_modules
npm permet de suivre les dépendances et de garder des informations sur un projet node grace au fichier ```package.json```. Il n'est pas obligatoire au fonctionnement du code mais est très utile.

exemple d'un fichier package.json
```
{
  "dependencies": {
    "socket.io": "^4.8.1"
  },
  "name": "test",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}

```
Le fichier ```package.json``` est créé par npm automatiquement soit : 
1. Au debut d'un projet, on peut creer un dossier 'nomduprojet' dans lequel on va executer la commande  ``` npm init```. 
    Cette commande permet de donner des informations sur le projet en question par exemple le nom, les auteurs, la licence, le nom du fichier de point d'entrée de l'application...
2. A l'installation d'un nouveau module dont le projet depend, on entre la commande ``` npm install module ```
    Cette commande permet de telecharger le module et l'installer dans le dossier du projet dans le sous dossier ```node_modules```, et d'ajouter la dependence dans le fichier ```package.json```.

##### Exemple avec socket.io
Par exemple, dans le cas d'un projet vide, on peut installer le module socket.io, en entrant la commande suivante:
```
...path$ mkdir testprojet
...path$ cd testprojet
...path/testprojet$ npm install socket.io
```
le package socket.io sera alors installé dans le sous-dossier ```node_modules``` (créé par npm puisqu'il n'existe pas encore), ainsi que tous le modules dont depend socket.io.

En resumer, npm et le fichier package.json permettent de partager le dossier contenant les differents fichiers d'un projet, sans inclure le sous dossier ```node_modules``` puisque toutes les dependences sont enregistrees dans le fichier ```package.json```.
Cela est tres utile lorsqu'il y a plusieurs controbuteurs a un projet par exemple.

La commande ```npm install``` executée dans le dossier permettra de reinstaller toutes les dependances à partir du contenu de ```package.json```. On peut rapidement faire l'essaie en supprimant le dossier node_modules et en entrant ```npm install``` > les modules listés dans ```package.json``` seront tous reinstallés.

Il est aussi possible d'installer un module globalement sur sa machine en   ajoutant le drapeau ```-g``` : ```npm install -g socket.io```

## 2 Style de programmation
### E/S asynchrones et fonctions de rappel

## 3 Modules
### L'API Modules de CommonJS
### Divers types de modules

## 4 Evénements
### 5.1 CPS vs. Event handlers
### 5.2 Event Handlers

## 5 Fichiers
### 6.1 Lecture
### 6.2 Écriture

## 6 Serveur HTTP
### 7.1 hello, world
### 7.2 L'objet http.serverRequest
### 7.3 L'objet http.serverResponse
### 7.4 Le corps de la requête
### 7.5 Exemple de serveur complet

## 7 Applications Web - connect
### 8.1 Le module 'connect'
### 8.2 Principe des middlewares
### 8.3 Routage simple
### 8.4 Exemple de middlewares
### 8.5 Middleware "maison"

## 8 Applications Web - express
### 9.1 Le module 'express'
### 9.2 Exemple de serveur express
### 9.3 Générateur d'application
### 9.4 Arborescence d'une application
### 9.5 Lancement d'une application

## 9 Web Sockets
### 10.1 Le module 'socket.io'
### 10.2 Mise en oeuvre de socket.io

## 10 Persistance des données
### 11.1 Le module 'mysql'
### 11.2 mysql SELECT

## 11 Exercices