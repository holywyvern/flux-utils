import copy         from 'deep-copy';
import EventManager from 'generic-events';

/**
 * An Store is a class than keeps an state.
 * Also it responds to actions to change its state.
 * After the state is changed, an Store emit the changes to all of 
 * the components subscribed to listen.
 */
class Store {

    /**
     * Creates a new store based on a set of actions
     * @param {Actions} actions A set of actions
     */
    constructor({ actions, methods = {}, state = {} }) {
        let proxy = this._defineProperties(state);
        this._defineActions(actions, methods, proxy);
    }

    /**
     * Defines the properties of the store
     * @param { object } state The state reference of the store.
     * @returns A proxy object, wich handles the real state management.
     * @private
     */
    _defineProperties(state) {
        let storeState = copy(state);
        let events     = new EventManager();
        Object.defineProperties(this, {
            /**
             * The event dispatcher of the Store
             */
            events: { 
                get() { 
                    return events; 
                } 
            },
            /**
             * The state of the Store.
             */
            state:  { 
                get() { 
                    return copy(storeState); 
                }
            }
        });

        return {
            /**
             * Get the event dispatcher of the store
             */
            get events() {
                return events; 
            },
            /**
             * Gets the current state of the store.
             * @note it makes a deep copy to avoid modification from outside of this object.
             */
            get state() {
                return copy(storeState); 
            },
            /**
             * Sets the state of the store and emit changes based on it.
             * @param { object } value The new state.
             * @note The event 'change' is always fired
             * @note The value is deep copied to avoid modifications from outside of this object.
             */
            set state(value) {
                storeState = copy(value);
                events.fire('change');
            },
            /**
             * Alias to state
             * @get
             */
            getState() {
                return this.state;
            },
            /**
             * Alias to state=
             * @set
             */
            setState(value) {
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
    _defineActions(actions, methods, proxy) {
        for (let action of actions.list()) {
            let callback = methods[action].bind(proxy);
            actions.dispatcher.on(action, callback);
        }
    }

    /**
     * Gets the current state of this store.
     * Equivalent to Store.prototype.state.
     * @returns A copy of the current state.
     * @see Store.prototype.state
     */
    getState() {
        return this.state;
    }

}

export default Store;