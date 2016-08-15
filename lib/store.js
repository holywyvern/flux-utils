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

var Store = function () {
    function Store(_ref) {
        var actions = _ref.actions;
        var _ref$methods = _ref.methods;
        var methods = _ref$methods === undefined ? {} : _ref$methods;
        var _ref$state = _ref.state;
        var state = _ref$state === undefined ? {} : _ref$state;

        _classCallCheck(this, Store);

        this._defineProperties(state);
        this._defineActions(actions, methods);
    }

    _createClass(Store, [{
        key: '_defineProperties',
        value: function _defineProperties(state) {
            var storeState = (0, _deepCopy2.default)(state);
            var events = new _genericEvents2.default();
            Object.defineProperties(this, {
                events: {
                    get: function get() {
                        return events;
                    }
                },
                state: {
                    get: function get() {
                        return (0, _deepCopy2.default)(storeState);
                    },
                    set: function set(value) {
                        storeState = (0, _deepCopy2.default)(value);
                        events.fire('change');
                    }
                }
            });
        }
    }, {
        key: '_defineActions',
        value: function _defineActions(actions, methods) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = actions.list()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var action = _step.value;

                    var callback = methods[action].bind(this);
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
    }]);

    return Store;
}();

exports.default = Store;
//# sourceMappingURL=store.js.map
