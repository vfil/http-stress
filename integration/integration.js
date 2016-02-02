var expect = require('chai').expect;

var http = require('http');
var stress = require('../');

describe('http-stress integration tests', function() {
    it('should send requests and retrieve responses', function(done) {

        this.timeout(10000);

        var expectedResponsesCount = 1000;
        var responsesCount = 0;

        var server = http.createServer(function(req, res) {

            //increment count for every new request
            responsesCount++;

            //load CPU with heavy computations, bigger argument provided - heavier
            var pi = calculatePi(100);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(pi.toString());
        });

        server.listen(1800, '127.0.0.1', expectedResponsesCount, function() {

            stress('http://127.0.0.1:1800', expectedResponsesCount).then(function() {
                try {
                    expect(responsesCount).to.equal(expectedResponsesCount);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});

/**
 * Compute Pi number after Leibniz formula
 */
function calculatePi(precision) {

    var Pi = 0, n = 1;

    for(var i = 0; i <= precision; i++) {
        Pi = Pi + (4 / n) - (4 / (n + 2));
        n = n + 4;
    }

    return Pi;
}

//profiler: 9625

