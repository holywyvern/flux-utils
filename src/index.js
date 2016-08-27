import StoreImport      from './store';
import ActionsImport    from './actions';
import DispatcherImport from './dispatcher';

export const Store      = StoreImport;
export const Actions    = ActionsImport;
export const Dispatcher = DispatcherImport;

/**
 * Creates a new dispatcher, equivalent to new Dispatcher()
 * @returns { Dispatcher } A new generated dispatcher
 * @see Dispatcher.prototype.constructor
 */
export function createDispatcher() {
    return new Dispatcher();
}

/**
 * Creates a new action set, equivalent to new Actions()
 * @param { Dispatcher } dispatcher (optional) The dispatcher this action set uses 
 * @param { string[] } actions The actions names the names for the actions to be created.  
 * @returns { Actions } A set of actions
 * @see Actions.prototype.constructor
 */
export function createActions(...names) {
    return new Actions(...names);
}

/**
 * Creates a new store with options assigned. Equivalent to new Store(options)
 * @param { object } A set of options to use the sotarage
 * @returns { Store } A new Store.
 * @see Store.prototype.constructor
 */
export function createStore(options) {
    return new Store(options);
}

export default {
    createDispatcher,
    createActions,
    createStore,
    Store,
    Actions,
    Dispatcher
};