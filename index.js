var http = require('http');

module.exports = function(url, count) {
    var i = count;
    var responses = 0;

    var agent = new http.Agent({keepAlive: true});

    function isLastRequest() {
        return responses === count;
    }

    return new Promise(function(resolve, reject) {
        while(i--) {
            send(url, i);
        }

        function send(url, j) {

            /*var options = {
                hostname: '127.0.0.1',
                port: 1800,
                path: '/',
                method: 'GET',
                agent: agent
            };*/

            var req = http.request(url, function(res) {

                res.on('data', function(data) {});

                res.on('end', function() {
                    responses++;
                    if(isLastRequest()) {
                        resolve();
                    }
                });
            });

            req.on('error', function(e) {
                throw new Error('problem with request: ' + j + ' error:' + e);
            });

            req.end();
        }
    });
};