http.get('http://nodejs.org/', function (res) {// fonction appelée dès que
    console.log(res.headers);                   // la réponse est disponible                                  
});
console.log('hello,world'); // s'affiche immédiatement