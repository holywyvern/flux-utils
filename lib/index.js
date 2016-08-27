'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dispatcher = exports.Actions = exports.Store = undefined;
exports.createDispatcher = createDispatcher;
exports.createActions = createActions;
exports.createStore = createStore;

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Store = exports.Store = _store2.default;
var Actions = exports.Actions = _actions2.default;
var Dispatcher = exports.Dispatcher = _dispatcher2.default;

/**
 * Creates a new dispatcher, equivalent to new Dispatcher()
 * @returns { Dispatcher } A new generated dispatcher
 * @see Dispatcher.prototype.constructor
 */
function createDispatcher() {
    return new Dispatcher();
}

/**
 * Creates a new action set, equivalent to new Actions()
 * @param { Dispatcher } dispatcher (optional) The dispatcher this action set uses 
 * @param { string[] } actions The actions names the names for the actions to be created.  
 * @returns { Actions } A set of actions
 * @see Actions.prototype.constructor
 */
function createActions() {
    for (var _len = arguments.length, names = Array(_len), _key = 0; _key < _len; _key++) {
        names[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(Actions, [null].concat(names)))();
}

/**
 * Creates a new store with options assigned. Equivalent to new Store(options)
 * @param { object } A set of options to use the sotarage
 * @returns { Store } A new Store.
 * @see Store.prototype.constructor
 */
function createStore(options) {
    return new Store(options);
}

exports.default = {
    createDispatcher: createDispatcher,
    createActions: createActions,
    createStore: createStore,
    Store: Store,
    Actions: Actions,
    Dispatcher: Dispatcher
};
//# sourceMappingURL=index.js.map
