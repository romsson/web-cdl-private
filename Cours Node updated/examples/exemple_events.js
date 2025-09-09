require('http').get( 'http://nodejs.org/en', function(response) { // CPS
    response.setEncoding('utf-8');

    response.on('data', function(data) { // 'data' event handler
        console.log('\n[DATA]',data);
    });

    response.on('end', function() { // 'end' event handler
        console.log('\n[END]');
    });
});