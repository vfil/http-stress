var http = require('http');
var URL = require('url');

/**
 *
 * @param {String} url URL of tested resource
 * @param {Number} count amount of requests
 * @returns {Promise}
 */
module.exports = function(url, count) {

    var i = count;
    var responses = 0;

    var urlObj = URL.parse(url);

    var agent = new http.Agent({keepAlive: true});

    function isLastRequest() {
        console.log('checking if last request', count, responses);
        return responses === count;
    }

    return new Promise(function(resolve, reject) {

        while(i--) {
            console.log('sending url ' + i);
            console.time('profiler');
            send(urlObj);
        }

        function send(urlObj) {

            var options = {
                protocol: urlObj.protocol,
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.path,
                method: 'GET'
                //agent: agent
            };

            var req = http.request(options, function(res) {
                console.log('new request');

                res.on('data', function(data) {
                    console.log('chunk data received');
                });

                res.on('end', function() {
                    console.log('end of data received');
                    responses++;
                    if(isLastRequest()) {
                        console.timeEnd('profiler');
                        resolve();
                    }
                });
            });

            req.on('error', function(e) {
                throw new Error('problem with request, error:' + e);
            });

            req.end();
        }
    });
};
