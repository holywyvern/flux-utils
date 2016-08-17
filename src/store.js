import copy         from 'deep-copy';
import EventManager from 'generic-events';

class Store {

    constructor({ actions, methods = {}, state = {} }) {
        let proxy = this._defineProperties(state);
        this._defineActions(actions, methods, proxy);
    }

    _defineProperties(state) {
        let storeState = copy(state);
        let events     = new EventManager();
        Object.defineProperties(this, {
            events: { 
                get() { 
                    return events; 
                } 
            },
            state:  { 
                get() { 
                    return copy(storeState); 
                }
            }
        });
        return {
            get state() {
                return copy(storeState); 
            },
            set state(value) {
                storeState = copy(value);
                events.fire('change');
            }
        };
    }

    _defineActions(actions, methods, proxy) {
        for (let action of actions.list()) {
            let callback = methods[action].bind(proxy);
            actions.dispatcher.on(action, callback);
        }
    }

}

export default Store;