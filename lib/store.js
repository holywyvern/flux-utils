'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _deepCopy = require('deep-copy');

var _deepCopy2 = _interopRequireDefault(_deepCopy);

var _genericEvents = require('generic-events');

var _genericEvents2 = _interopRequireDefault(_genericEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An Store is a class than keeps an state.
 * Also it responds to actions to change its state.
 * After the state is changed, an Store emit the changes to all of 
 * the components subscribed to listen.
 */
var Store = function () {

    /**
     * Creates a new store based on a set of actions
     * @param {Actions} actions A set of actions
     */
    function Store(_ref) {
        var actions = _ref.actions;
        var _ref$methods = _ref.methods;
        var methods = _ref$methods === undefined ? {} : _ref$methods;
        var _ref$state = _ref.state;
        var state = _ref$state === undefined ? {} : _ref$state;

        _classCallCheck(this, Store);

        var proxy = this._defineProperties(state);
        this._defineActions(actions, methods, proxy);
    }

    /**
     * Defines the properties of the store
     * @param { object } state The state reference of the store.
     * @returns A proxy object, wich handles the real state management.
     * @private
     */


    _createClass(Store, [{
        key: '_defineProperties',
        value: function _defineProperties(state) {
            var storeState = (0, _deepCopy2.default)(state);
            var events = new _genericEvents2.default();
            Object.defineProperties(this, {
                /**
                 * The event dispatcher of the Store
                 */
                events: {
                    /**
                     * Gets the current event dispatcher.
                     * @get { Dispatcher }
                     */
                    get: function get() {
                        return events;
                    }
                },
                /**
                 * The state of the Store.
                 */
                state: {
                    /**
                     * Gets a copy of the current state of this Store.
                     */
                    get: function get() {
                        return (0, _deepCopy2.default)(storeState);
                    }
                }
            });

            return {
                /**
                 * Get the event dispatcher of the store
                 * @return { Dispatcher } The event dispatcher
                 */
                get events() {
                    return events;
                },
                /**
                 * Gets the current state of the store.
                 * @returns { object } A copy of the current state.
                 * @note it makes a deep copy to avoid modification from outside of this object.
                 */
                get state() {
                    return (0, _deepCopy2.default)(storeState);
                },
                /**
                 * Sets the state of the store and emit changes based on it.
                 * @param { object } value The new state.
                 * @note The event 'change' is always fired
                 * @note The value is deep copied to avoid modifications from outside of this object.
                 */
                set state(value) {
                    storeState = (0, _deepCopy2.default)(value);
                    events.fire('change');
                },
                /**
                 * Alias to state
                 * @get
                 */
                getState: function getState() {
                    return this.state;
                },

                /**
                 * Alias to state=
                 * @set
                 */
                setState: function setState(value) {
                    this.state = value;
                }
            };
        }

        /**
         * Define actions based on the Action set.
         * @param { Actions} actions the actions of this store.
         * @param { object } methods a collection of methods for the store.
         * @param { object } proxy The proxy object generated before.
         * @private
         */

    }, {
        key: '_defineActions',
        value: function _defineActions(actions, methods, proxy) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = actions.list()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var callback = methods[action].bind(proxy);
                    actions.dispatcher.on(action, callback);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Gets the current state of this store.
         * Equivalent to Store.prototype.state.
         * @returns A copy of the current state.
         * @see Store.prototype.state
         */

    }, {
        key: 'getState',
        value: function getState() {
            return this.state;
        }
    }]);

    return Store;
}();

exports.default = Store;
//# sourceMappingURL=store.js.map
