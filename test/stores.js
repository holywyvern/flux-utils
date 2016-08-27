"use strict";
let chai   = require('chai');
let flux   = require('../index');

const expect = chai.expect;

describe('Test stores', function () {
    describe('Test Store exists', function () {
        it('Check new Store and flux.createStore works', function () {
            let actions = new flux.Actions('test');
            flux.createStore({ actions, methods: { test() {} } });
        });
    });
    describe('Test Store methods', function () {
        it('Check than methods work as expected', function () {
            let actions = new flux.Actions('test');
            let store   = new flux.Store({
                actions,
                methods: {
                    test(str) {
                        if (str === 'test-valid') {
                            throw "Valid String";
                        }
                    }
                }
            });
            expect(function () { actions.test('test-valid'); }).to.throw("Valid String");
        });
    });    
    describe('Test Store state', function () {
        it('Check than methods changes the state', function () {
            let actions = new flux.Actions('test');
            let store   = new flux.Store({
                actions,
                state: { valid: true },
                methods: {
                    test() {
                        this.state = { valid: true };
                    }
                }
            });
            store.events.on('change', function () { 
                if (store.state.valid) throw "Test ok";
            });
            expect(actions.test).to.throw("Test ok");
        });
    });      
    describe('Test Store state methods', function () {
        it('Check than getState and setState works', function () {
            let actions = new flux.Actions('test');
            let store   = new flux.Store({
                actions,
                state: { valid: true },
                methods: {
                    test() {
                        this.setState({ valid: true });
                    }
                }
            });
            store.events.on('change', function () { 
                if (store.getState().valid) throw "Test ok";
            });
            expect(actions.test).to.throw("Test ok");
        });
    });         
});