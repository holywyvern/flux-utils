import Dispatcher from './dispatcher';

/**
 * 
 */
class Actions {

    /**
     * Creates a new action set, using the names provided.
     * 
     * When no Dispatcher is provided, the action set creates one for itself.
     * 
     * @param { Dispatcher } [dispatcher] (optional) The dispatcher this action set uses 
     * @param { string[] } ...actions The actions names the names for the actions to be created.
     */
    constructor(...actions) {
        let names = actions.slice(0);
        this._createDispatcher(names);
        this._createHandles(names);
        this.list = () => {
            return names.slice(0);
        };
    }

    /**
     * Creates a dispatcher for this action set or
     * uses the one provided in the parameters.
     * @param { Dispatcher } [dispatcher] (optional) The dispatcher this action set uses 
     * @param { string[] } ...names The actions names the names for the actions to be created.
     * @private
     * 
     */
    _createDispatcher(names) {
        let dispatcher = null;
        if (names[0] instanceof Dispatcher) {
            dispatcher = names.shift();
        } else {
            dispatcher = new Dispatcher();
        }     
        /**
         * Gets the current dispatcher assigned
         * @get dispatcher 
         */
        Object.defineProperty(this, 'dispatcher', {
            get() {
                return dispatcher;
            }
        });           
    }

    /**
     * Creates a list of handles based on action names.
     * @param { string[] } ...names The names of the actions.
     * @private  
     */
    _createHandles(names) {
        for (let name of names) {
            this[name] = (...args) => this.dispatcher.fire(name, ...args);
        }     
    }

};

/* Exported value */
export default Actions;