import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/index'
import {NEW_JVM} from '../actions/jvm'

const logger = createLogger({
    predicate: (getState, action) => action.type !== NEW_JVM
});

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, logger)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}
