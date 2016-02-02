var URL = require('url');

var utils = {};

/**
 *
 * @param {String} url an url string
 * @param {String} method one of HTTP methods(verbs)
 * @param {http.Agent| boolean} [agent] nodejs http.Agent instance
 * @returns {object} key values object which match nodejs http.request argument
 */
utils.buildRequestOptions = function(url, method, agent) {

    var urlObj = URL.parse(url);

    var options = {
        protocol: urlObj.protocol,
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.path,
        method: method
    };

    //agent should be included even if is false, in this case node should create new agent
    if(agent !== undefined) {
        options.agent = agent;
    }

    return options;
};

module.exports = utils;
