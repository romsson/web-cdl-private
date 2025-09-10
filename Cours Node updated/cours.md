# Node.js
Cours node.js Daniel Muller - revision 2025
* Rearrangement de l'ordre de certaines choses
* Mise a jour des exemples (var > const/let)
* Ajout d'informations sur le package manager: le dossier node_modules, package.json 

## 1. Introduction
### Description
[Node.js](https://nodejs.org/en/) est un framework Javascript côté serveur créé en 2009 par Ryan Dahl, qui s'appuie sur la machine virtuelle [V8 engine](https://v8.dev/docs) développée par Google pour Chrome, elle-même publiée en open source fin 2008.

Node.js a été conçu dès le départ autour d'une boucle de gestion d'événements asynchrones, et un [mécanisme d'entrées/sorties non bloquantes](https://en.wikipedia.org/wiki/Asynchronous_I/O), ce qui rend le framework extrêmement performant en termes de montée en charge.

Il intègre un mécanisme qui permet de limiter la portée des variables en isolant le code dans des [modules](http://wiki.commonjs.org/wiki/Modules/1.0) et possède un système de gestion de bibliothèques très bien alimenté par la communauté [npm](https://www.npmjs.org/).

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

Pour arrêter le processus, entrer ctrl+c dans le terminal

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
1. Au debut d'un projet, on peut créer un dossier 'nomduprojet' dans lequel on va executer la commande  ``` npm init```. 
    Cette commande permet de donner des informations sur le projet en question par exemple le nom, les auteurs, la licence, le nom du fichier de point d'entrée de l'application...
2. A l'installation d'un nouveau module dont le projet depend, on entre la commande ``` npm install module ```
    Cette commande permet de télécharger le module et l'installer dans le dossier du projet dans le sous dossier ```node_modules```, et d'ajouter la dependence dans le fichier ```package.json```.

##### Exemple avec socket.io
Par exemple, dans le cas d'un projet vide, on peut installer le module socket.io, en entrant la commande suivante:
```
...path$ mkdir testprojet
...path$ cd testprojet
...path/testprojet$ npm install socket.io
```
le package socket.io sera alors installé dans le sous-dossier ```node_modules``` (créé par npm puisqu'il n'existe pas encore), ainsi que tous le modules dont depend socket.io.

En resumer, npm et le fichier package.json permettent de partager le dossier contenant les différents fichiers d'un projet, sans inclure le sous dossier ```node_modules``` puisque toutes les dépendances sont enregistrées dans le fichier ```package.json```.
Cela est tres utile lorsqu'il y a plusieurs contributeurs a un projet par exemple.

La commande ```npm install``` exécutée dans le dossier permettra de réinstaller toutes les dépendances à partir du contenu de ```package.json```. On peut rapidement faire l'essaie en supprimant le dossier node_modules et en entrant ```npm install``` > les modules listés dans ```package.json``` seront tous réinstallés.

Il est aussi possible d'installer un module globalement sur sa machine en ajoutant le drapeau ```-g``` : ```npm install -g socket.io```

## 2 Style de programmation
### E/S asynchrones et fonctions de rappel
Les systèmes traditionnels traitent une opération d'entrée-sortie (lecture/écriture de fichier, accès base de données, requête réseau...) comme un appel de fonction : le programme appelant est bloqué tant que le résultat n'est pas disponible.
```
<?php
$page = file_get_contents('http://nodejs.org/'); // peut durer un certain temps
echo "hello, world\n";
// ne s'affiche qu'après ... un certain temps
?>
```
Node.js résout ce problème en gérant systématiquement les E/S en mode asynchrone. Le programme appelant fournit une fonction de rappel qui est activée lorsque l'opération est achevée :

[exemple_async.js](examples/exemple_async.js)
```
http.get('http://nodejs.org/', function (res) {// fonction appelée dès que
    console.log(res.headers);                   // la réponse est disponible                                  
});
console.log('hello,world'); // s'affiche immédiatement
```

Dans cet exemple le message "hello, world" est affiché avant les entêtes récupérées par la requête http.

Bon à savoir : il est de la responsabilité d'une fonction de rappel de ne pas durer trop longtemps pour ne pas bloquer la boucle de gestion des événements.

## 3 Modules
### L'API Modules de CommonJS
La possibilité (volontaire ou accidentelle) de polluer l'espace global depuis n'importe quelle partie d'une application n'est pas l'une des qualités de Javascript.
Node.js résout ce problème en implémentant la notion de modules [modules](https://wiki.commonjs.org/wiki/Modules) spécifiée par
[CommonJS](https://en.wikipedia.org/wiki/CommonJS) : [node modules](https://nodejs.org/api/modules.html#modules_modules)

* un module utilise la variable prédéfinie ```exports``` comme unique moyen de transmettre son API
(attributs, méthodes) au module appelant,
* un module accède à l'API d'un module dont il dépend, via la fonction prédéfinie ```require()``` qui
lui renvoie les informations exportées par celui-ci.

Module [increment.js](examples/increment.js)
```
let i = 0;
function increment(){
    return i++;
}
module.exports = { increment }
```

Module appelant: [callincrement.js](examples/callincrement.js)
```
const incrementmodule = require('./increment'); // récupère les infos exportées par increment.js
console.log(incrementmodule.increment());
// 0
console.log(incrementmodule.increment());
// 1
console.log(typeof (i));
// undefined
```

### Divers types de modules
Node.js possède un certain nombre de modules de base, que l'on peut simplement charger en précisant leur nom, (c'est à dire sans besoin de les installer via npm)

```
const http = require('http');
```
La deuxième possibilité consiste à désigner un module par son chemin d'accès (relatif ou absolu) :
```
const util = require('./util');
// désigne le fichier ./util.js
const lib = require('C:/Users/.../Documents/travail/lib');
// lib.js
```
Noter qu'il est inutile de mentionner l'extension ```.js```, et que le chemin relatif ```./``` est obligatoire, même pour un fichier localisé dans le même répertoire que le module appelant.

S'il ne s'agit ni d'un module de base, ni d'un fichier spécifié via son chemin d'accès, node examine le contenu des répertoires node_modules local, puis global. Ces répertoires sont utilisés pour stocker les modules récupérés via [npm](https://www.npmjs.com/).
```
const io = require('socket.io');
// socket.io est un module chargé via npm
```

## 4 Evénements
### Continuation-Passing Style vs. Event handlers
En programmation asynchrone, pour qu'une fonction ne bloque pas le programme appelant, on lui passe en paramètre une fonction dite fonction de callback à appeler avec le résultat demandé, une fois qu'elle l'a obtenu. Il s'agit d'un motif (pattern) récurrent en programmation, connu sous le nom de Continuation-passing Style (CPS) :

```
http.get({host:'nodejs.org'}, function(res) { // fonction appelée dès que res
    console.log(res.headers);                  // (la réponse) est disponible
});
console.log('hello,world'); // s'affiche immédiatement
```

Il ne faut pas confondre le pattern CPS avec celui des gestionnaires d'événement, qui s'applique
plutôt en cas d'événements répétitifs ou aléatoires :

[exemple_events.js](examples/exemple_events.js)
```
require('http').get( 'http://nodejs.org/en', function(response) { // CPS
    response.setEncoding('utf-8');

    response.on('data', function(data) { // 'data' event handler
        console.log('\n[DATA]',data);
    });

    response.on('end', function() { // 'end' event handler
        console.log('\n[END]');
    });
});
```

### Event Handlers
Sous Node.js un événement est caractérisé par son nom (cf. data ou end dans l'exemple précédent).
La seule façon de connaître le nom des événements émis par un objet donné, ainsi que la liste et la
nature des paramètres passés à la fonction de rappel est de consulter la documentation de l'objet
en question.

L'API pour la gestion des événements est classique. Pour enregistrer un gestionnaire il existe deux
synonymes :
```
let callbackfunction = function() { ... };
object.addListener('event_type', callbackfunction);
object.on('event_type', function() { ... });
```
Pour une fonction de rappel à usage unique :
```
object.once('event_type', function() { ... });
```
Pour supprimer un gestionnaire préalablement enregistré :
```
object.removeListener('event_type', callbackfunction); // pas une fonction anonyme
```
Pour supprimer tous les gestionnaires pour un type d'événement donné :
```
object.removeAllListeners('event_type');
```

## 5 Fichiers

### Lecture
Pour lire un fichier, on peut créer un objet ```ReadStream```:

[exemple_readstream.js](examples/exemple_readstream.js)
```
const fs = require('fs'), stream = fs.createReadStream('./hello.txt'); // chemin relatif ou absolu

stream.setEncoding('utf-8'); // pour récupérer des chaînes de caractères
stream.on('data', function(data) { // peut être appelée plusieurs fois consécutives
    console.log(data);
});
```

Un stream est comme un robinet de données :
* il peut éventuellement être fermé en appelant ```stream.pause()```, puis rouvert avec ```stream.resume()```
* il prévient lorsqu'il est "asséché" (fin de fichier) en émettant un événement end et émet un événement error en cas de problème.

### Écriture
L'écriture dans un fichier s'effectue avec un ```WriteStream``` :
```
const fs = require('fs'), 
myStream = fs.createWriteStream('./writestream.out'), 
now = new Date();

myStream.write(now.toString()+"\n");
```

Pour écrire en fin de fichier sans écraser le contenu existant il faut passer un second paramètre à la création du Stream :

[exemple_writestream.js](examples/exemple_writestream.js)
```
const fs = require('fs'), 
myStream = fs.createWriteStream('./writestream.out',{flags: 'a'}), 
now = new Date();

myStream.write(now.toString()+"\n");
```

## 6 Serveur HTTP
### hello, world
Le code source d'un serveur Web répondant "hello, world" à toutes les requêtes a déjà été vu :

[helloserver.js](examples/helloserver.js)
```
const server = require('http').createServer( function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("hello, world\n");
});
server.listen(8080);
console.log('Adresse du serveur: http://localhost:8080/');
```

Ce serveur se démarre en ligne de commande de la façon suivante :
```
node helloserver.js
```
Pour développer un serveur un peu plus réaliste, il faudra s'intéresser aux objets ```request``` et ```response```.

### L'objet http.serverRequest
L'objet ```request``` possède les attributs suivants :

**[method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)** : La méthode de la requête (i.e. GET, HEAD, POST...).

**url** : L'adresse utilisée pour la requête, sans le protocole, le nom du serveur, ni l'identifiant de fragment mais avec le chemin d'accès et la chaîne de requête.

**[headers](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)** : Un objet avec la liste des entêtes http envoyées par le client avec la requête.

[server_request.js](examples/server_request.js)
```
const http = require('http');
const server = http.createServer(function (request, response) {
    console.log('Quelqu\'un envoie une requête au serveur')
    console.log("Méthode: " + request.method);
    console.log("URL: " +request.url);
    console.log(request.headers);
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
});
server.listen(8080);
```

### L'objet http.serverResponse
La méthode ```response.writeHead()``` permet de spécifier le **[statut](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)** et les **[headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header)** de la réponse.

```
const http = require('http');
const server = http.createServer( function(request, response) {
response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Server': 'node.js cousu main',
    'Cache-Control': 'no-store'
    ...
});
response.end('hello, world');
});
server.listen(8080);
```

Dans cet exemple la réponse envoie un status 200 (OK).

L'objet d’entête de l'exemple contient:
*  le type de contenu '[Content-type](https://developer.mozilla.org/fr/docs/Web/HTTP/Reference/Headers/Content-Type)', ici du texte
* une information sur le programme du serveur '[Server](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server)'
* une directive '[Cache-control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control): no-store' indiquant que la réponse ne doit pas être enregistrée en cache.

> 💡 une fois la réponse préconfigurée avec ```response.writeHead()``` il est possible d'ajouter de nouvelles entêtes (ou de modifier des entêtes existantes) avec la méthode ```response.setHeader(name,value)```.

On envoie le corps de la réponse avec la méthode ```response.write()``` :
```
response.writeHead(200, {'Content-Type': 'text/plain'});
response.write('hello, world');
response.end();
```
### Le corps de la requête
Lorsque la fonction de callback traitant une requête est appelée, le corps de la requête n'est pas forcément déjà disponible. Pour y accéder il faut considérer la requête comme un flux, qui déclenche
l'événement ```data``` lorsque des données arrivent et l'événement end lorsque le flux est tari :

[simple_server.js](examples/simple_server.js)
```
const http = require('http');
const server = http.createServer( function(request, response) {
    html = '<!DOCTYPE html><pre>';
    html += "<h1> Bonjour </h1> <p>Le client a demandé l'url:" + request.url + "</p>"
    request.on('data', function(datacontent) {
        html += datacontent;
        console.log('[DATA] ' + datacontent + "\n");
    });

    request.on('end', function(data) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        response.write(html + "</pre>");
        response.end();
    });
});
server.listen(8080);
```

Les requêtes GET ne déclenchent pas l'événement ```data``` puisqu'elles ne possèdent pas de corps.
Pour envoyer une requête avec un corps il faut appeler ce serveur avec une requête POST par exemple.

### Exemple de serveur complet
En combinant les éléments déjà vus on peut obtenir un serveur (presque) complet:

[simple_server_file.js](examples/simple_server_file.js)
```
const fs = require('fs'), 
    http = require('http');

const server = http.createServer(function (request, response) {
    let sent_header = false
    const stream = fs.createReadStream('htdocs' + request.url);
    stream.setEncoding('utf-8');

    stream.on('error', function (e) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('ERROR 404: Désolée, le document demandé est introuvable...');
    });

    stream.on('data', function (data) {
        if (!sent_header) {
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            sent_header = true;
        }
        response.write(data);
    });
    stream.on('end', function (data) { response.end(); });
});
server.listen(8080);
```
Dans cet exemple, le serveur délivre les documents situés dans le sous-répertoire htdocs.
Ce serveur doit encore être amélioré pour servir des fichiers autres que text/html.

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