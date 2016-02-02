var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var PassThrough = require('stream').PassThrough;
var http = require('http');

describe('http-stress', function() {

    var stress,
        httpRequestStub,
        request,
        expectedResponse = { key: 'value'},
        response;

    beforeEach(function() {

        //stub http.request module
        httpRequestStub = sinon.stub(http, 'request');

        //use nodejs PassThrough Stream type to fake data flow
        request = new PassThrough();
        response = new PassThrough();
        response.write(JSON.stringify(expectedResponse));
        response.end();

        //configure httpRequestStub to invoke callback function, so 'data' and 'end' events are emitted
        httpRequestStub.callsArgWithAsync(1, response).returns(request);

        stress = require('../');
    });

    afterEach(function() {
        httpRequestStub.restore();
    });

    it('should send requests to provided url certain times', function(done) {

        var testUrl = 'http://test/me';

        stress(testUrl, 5).then(function() {
            try {
                expect(httpRequestStub.alwaysCalledWith(testUrl), 'always sends requests to right URL').to.equal(true);
                expect(httpRequestStub.callCount, 'sends right number of requests').to.equal(5);
                console.log(httpRequestStub.callCount);
                done();
            } catch (e) {
                done(e)
            }
        });
    });
});
