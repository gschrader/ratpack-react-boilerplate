import { combineReducers } from 'redux'
import auth from './auth';
import jvm from './jvm';
import { routerReducer } from 'react-router-redux'


const rootReducer = combineReducers({
    auth,
    jvm,
    routing: routerReducer
});

export default rootReducer;
