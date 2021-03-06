import Dispatcher from './dispatcher';

/**
 * Actions are keep organized as different objects here,
 * for easy keeping appart to wich one is.
 * Each action is when called, dedicated to pass the action information into 
 * the dispatcher, and then, the dispatcher just sends them to all stores 
 * listening to this actions.
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
        /**
         * List all current actions names.
         * @returns { string[] } A list of action names.
         */
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
            /**
             * Get the current event dispatcher of this action set.
             */
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