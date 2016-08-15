"use strict";
let chai   = require('chai');
let flux   = require('../index');

const expect = chai.expect;

describe('Test actions', function () {
    describe('Test Actions exists', function () {
        it('Check new Actions and flux.createActions works', function () {
            let actions = new flux.Actions('a', 'b', 'c');
            expect(actions).to.be.an.instanceof(flux.Actions);
            expect(flux.createActions('a', 'b', 'c')).to.be.an.instanceof(flux.Actions);
            expect(actions.dispatcher).to.be.an.instanceof(flux.Dispatcher);
        });
    });
    describe('Test custom dispatcher', function () {
        it('Test than a custom dispatcher works', function () {
            let dispatcher = new flux.Dispatcher();
            let actions = new flux.Actions(dispatcher, 'a', 'b', 'c');
            expect(actions.dispatcher).to.be.equal(dispatcher);
        });
    });
    describe('Test Action handles', function () {
        it('Test than an action is added as function', function () {
            let actions = new flux.Actions('add', 'update');
            expect(actions.add).to.be.a('function');
            expect(actions.update).to.be.a('function');
        });
    });
});