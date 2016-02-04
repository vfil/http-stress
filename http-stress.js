var http = require('http');
var utils = require('./utils.js');
var Statistic = require('./statistic.js');

/**
 *
 * @param {object} options nodejs parsed url from url.parse()
 * @param {Number} count amount of requests
 * @returns {Promise}
 */
module.exports = function(options, count) {

    var statistic = new Statistic();

    var i = count;
    var responses = 0;

    //inject an http.Agent for statistic usage
    var agent = options.agent;
    if(!agent) {
        agent = new http.Agent({keepAlive: true});
        options.agent = agent;
    }

    statistic.setKeepAlive(agent.keepAlive);

    function isLastRequest() {
        console.log('checking if last request', count, responses);
        return responses === count;
    }

    return new Promise(function(resolve, reject) {

        while(i--) {
            console.log('sending url ' + i);
            console.time('profiler');
            send();
        }

        function send() {

            var req = http.request(options, function(res) {
                console.log('new request');
                //statistic.hitMaxSockets(agent.sockets);
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
