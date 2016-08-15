'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dispatcher2 = require('./dispatcher');

var _dispatcher3 = _interopRequireDefault(_dispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actions = function () {
    function Actions() {
        _classCallCheck(this, Actions);

        for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
            actions[_key] = arguments[_key];
        }

        var names = actions.slice(0);
        this._createDispatcher(names);
        this._createHandles(names);
        this.list = function () {
            return names.slice(0);
        };
    }

    _createClass(Actions, [{
        key: '_createDispatcher',
        value: function _createDispatcher(names) {
            var dispatcher = null;
            if (names[0] instanceof _dispatcher3.default) {
                dispatcher = names.shift();
            } else {
                dispatcher = new _dispatcher3.default();
            }
            Object.defineProperty(this, 'dispatcher', {
                get: function get() {
                    return dispatcher;
                }
            });
        }
    }, {
        key: '_createHandles',
        value: function _createHandles(names) {
            var _this = this;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var name = _step.value;

                    _this[name] = function () {
                        var _dispatcher;

                        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            args[_key2] = arguments[_key2];
                        }

                        return (_dispatcher = _this.dispatcher).fire.apply(_dispatcher, [name].concat(args));
                    };
                };

                for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
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

    return Actions;
}();

;

exports.default = Actions;
//# sourceMappingURL=actions.js.map