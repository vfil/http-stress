var expect = require('chai').expect;

var Statistic = require('../statistic.js');

xdescribe('statistics suite', function() {

    var statistic;

    beforeEach(function() {
        statistic = new Statistic();
    });

    it('statistic should be initialized as expected', function() {
        expect(statistic.getKeepAlive()).to.equal(undefined);
        expect(statistic.getSocketScore()).to.equal(undefined);
    });

    it('statistic should compute results', function() {
        expect(statistic.getResults()).to.eql({
            keepAlive: undefined,
            socketScore: undefined
        });
    });

    it('statistics.setKeepAlive should set keepAlive flag', function() {
        statistic.setKeepAlive(true);
        expect(statistic.getKeepAlive()).to.equal(true);
    });

    it('statistic.setSocketScore should set socketScore', function() {
        statistic.setSocketScore(100);
        expect(statistic.getSocketScore()).to.equal(100);
    });

    it('statistics.hitMaxSockets should increase socketsScore when more then previous', function() {

    });
});

describe('statistic suite', function() {

});
