import Dispatcher from './dispatcher';

class Actions {

    constructor(...actions) {
        let names = actions.slice(0);
        this._createDispatcher(names);
        this._createHandles(names);
        this.list = () => {
            return names.slice(0);
        };
    }

    _createDispatcher(names) {
        let dispatcher = null;
        if (names[0] instanceof Dispatcher) {
            dispatcher = names.shift();
        } else {
            dispatcher = new Dispatcher();
        }     
        Object.defineProperty(this, 'dispatcher', {
            get() {
                return dispatcher;
            }
        });           
    }

    _createHandles(names) {
        for (let name of names) {
            this[name] = (...args) => this.dispatcher.fire(name, ...args);
        }     
    }

};

export default Actions;