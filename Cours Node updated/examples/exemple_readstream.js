const fs = require('fs'), stream = fs.createReadStream('./hello.txt'); // chemin relatif ou absolu

stream.setEncoding('utf-8'); // pour récupérer des chaînes de caractères
stream.on('data', function(data) { // peut être appelée plusieurs fois consécutives
    console.log(data);
});