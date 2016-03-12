import { combineReducers } from 'redux'
import auth from './auth';
import jvm from './jvm';


const rootReducer = combineReducers({
    auth,
    jvm
});

export default rootReducer;
