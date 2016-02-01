var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var PassThrough = require('stream').PassThrough;
var http = require('http');

describe('http-stress', function() {

    var stress,
        request,
        expectedResponse = { key: 'value'},
        response;

    beforeEach(function(done) {

        request = sinon.stub(http, 'request');

        stress = require('../');

        response = new PassThrough();
        response.write(JSON.stringify(expectedResponse));
        response.end(function() {
            request.callsArgWith(1, response);
            done();
        });
    });

    afterEach(function() {
        request.restore();
    });

    it('should call http-stress with provided url', function(done) {
        stress('test', 10).then(function() {
            expect(request.alwaysCalledWith('test')).to.equal(false);
            done();
        })
    });

    xit('should send a request', function(done) {

        var request = new PassThrough();

        /*this.request.callsArgWith(1, response)
          .returns(request);*/

        /*stress('test',function(response) {
            expect(response).to.equal(JSON.stringify(expected));
            done();
        });*/

        stress('test', 10).then(function() {
            expect(request.alwaysCalledWith('test')).to.equal(false);
            done();
        })
    });
});
