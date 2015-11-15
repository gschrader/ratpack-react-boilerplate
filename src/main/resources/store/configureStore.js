import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import auth from '../reducers/auth';
import jvm from '../reducers/jvm';
import {NEW_JVM} from '../actions/jvm'

const logger = createLogger({
    predicate: (getState, action) => action.type !== NEW_JVM
});

const reducer = combineReducers(
    {
        auth,
        jvm
    }
);

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    logger
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
