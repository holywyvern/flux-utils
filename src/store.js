import copy         from 'deep-copy';
import EventManager from 'generic-events';

class Store {

    constructor({ actions, methods = {}, state = {} }) {
        this._defineProperties(state);
        this._defineActions(actions, methods);
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
                }, 
                set(value) { 
                    storeState = copy(value);
                    events.fire('change');
                } 
            }
        });
    }

    _defineActions(actions, methods) {
        for (let action of actions.list()) {
            let callback = methods[action].bind(this);
            actions.dispatcher.on(action, callback);
        }
    }

}

export default Store;