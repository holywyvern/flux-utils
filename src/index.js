import StoreImport      from './store';
import ActionsImport    from './actions';
import DispatcherImport from './dispatcher';

export const Store      = StoreImport;
export const Actions    = ActionsImport;
export const Dispatcher = DispatcherImport;

export function createDispatcher() {
    return new Dispatcher();
}

export function createActions(...names) {
    return new Actions(...names);
}

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