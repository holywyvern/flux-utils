"use strict";
let chai   = require('chai');
let flux   = require('../index');

const expect = chai.expect;

describe('Test dispatcher', function () {
    describe('Test dispatcher exists', function () {
        it('Check new Dispatcher and flux.createDispatcher works', function () {
            expect(new flux.Dispatcher()).to.be.an.instanceof(flux.Dispatcher);
            expect(flux.createDispatcher()).to.be.an.instanceof(flux.Dispatcher);
        });
    });
});