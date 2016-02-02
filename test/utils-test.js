var expect = require('chai').expect;
var utils = require('../utils.js');

describe('utils test suite', function() {
    it('utils.buildRequestOptions should compute options object for request', function() {
        var url = 'http://test.me:888/slug';
        var method = 'GET';

        var result = utils.buildRequestOptions(url, method);
        expect(result, 'build request options without agent')
          .to.eql({
            protocol: 'http:',
            hostname: 'test.me',
            port: '888',
            path: '/slug',
            method: 'GET'
        });

        var agent = false;
        result = utils.buildRequestOptions(url, method, agent);
        expect(result, 'build request options with agent set to false')
          .to.eql({
            protocol: 'http:',
            hostname: 'test.me',
            port: '888',
            path: '/slug',
            method: 'GET',
            agent: agent
        });

        agent = {isAgent: true}
        result = utils.buildRequestOptions(url, method, agent);
        expect(result, 'build request options with agent')
          .to.eql({
            protocol: 'http:',
            hostname: 'test.me',
            port: '888',
            path: '/slug',
            method: 'GET',
            agent: agent
        });
    });
});
