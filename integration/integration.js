var expect = require('chai').expect;
var http = require('http');

describe('http-stress integration tests', function() {
    it('should send request and retrieve response', function(done) {

        this.timeout(60000);

        var server = http.createServer();

        server.on('request', function(req, res) {
            var pi = calculatePi();
            var pi = 3.14;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(pi.toString());
        });

        server.on('clientError', function(exception, socket) {
            console.log('clientError ' + exception);
        });

        server.listen(1800, '127.0.0.1', 1000, function() {
            var stress = require('../');
            stress('http://127.0.0.1:1800', 100).then(function() {
                done();
            });
        });
    });
});

function calculatePi() {
    var Pi= 0, n=1;

    for(var i = 0; i <= 1000; i++) {
        Pi = Pi + (4 / n) - (4 / (n + 2));
        n = n + 4;
    }

    return Pi;
}

