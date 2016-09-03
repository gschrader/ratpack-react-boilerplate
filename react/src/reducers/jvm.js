import {NEW_JVM, FETCH_JVM_SUCCESS, FETCH_RUNTIME_SUCCESS, DISCONNECTED} from '../actions/jvm';

const initialState = {
    jvm: {
        last: null,
        points: [],
        disconnected: false
    }
};

export default function jvm(state = initialState, action = {}) {
    switch (action.type) {
        case FETCH_JVM_SUCCESS:
            return Object.assign({}, state, {
                jvm: action.data
            });
        case FETCH_RUNTIME_SUCCESS:
            return Object.assign({}, state, {
                runtime: action.data,
                pathSeparator: action.data.systemProperties['path.separator']
            });
        case NEW_JVM:
            var data = [...state.jvm.points, action.data];
            if (data.length > 10000) {
                data.shift();
            }

            return Object.assign({}, state, {
                jvm: {
                    last: action.data,
                    points: data
                }
            });

        case DISCONNECTED:
            return Object.assign({}, state, {
                disconnected: true
            });

        default:
            return state;
    }
}