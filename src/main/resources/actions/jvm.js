import {checkStatus, parseJSON, urlToWS, getHeaders} from './utils';

export const FETCH_JVM_REQUEST = 'FETCH_JVM_REQUEST';
export const FETCH_JVM_SUCCESS = 'FETCH_JVM_SUCCESS';
export const FETCH_JVM_FAILURE = 'FETCH_JVM_FAILURE';
export const NEW_JVM = 'NEW_JVM';
export const DISCONNECTED = 'DISCONNECTED';

function fetchJvmRequest() {
    return {
        type: FETCH_JVM_REQUEST
    };
}

function fetchJvmSuccess(data) {
    return {
        type: FETCH_JVM_SUCCESS,
        data: data
    };
}

function fetchJvmFailure(error) {
    return {
        type: FETCH_JVM_FAILURE,
        error: error
    };
}

function fetchRuntimeRequest() {
    return {
        type: FETCH_RUNTIME_REQUEST
    };
}

function fetchRuntimeSuccess(data) {
    return {
        type: FETCH_RUNTIME_SUCCESS,
        data: data
    };
}

function fetchRuntimeFailure(error) {
    return {
        type: FETCH_RUNTIME_FAILURE,
        error: error
    };
}

function forceGCRequest() {
    return {
        type: FORCE_GC_REQUEST
    };
}

function forceGCSuccess(data) {
    return {
        type: FORCE_GC_SUCCESS,
        data: data
    };
}

function forceGCFailure(error) {
    return {
        type: FORCE_GC_FAILURE,
        error: error
    };
}

function shutdownRequest() {
    return {
        type: SHUTDOWN_REQUEST
    };
}

function shutdownSuccess(data) {
    return {
        type: SHUTDOWN_SUCCESS,
        data: data
    };
}

function shutdownFailure(error) {
    return {
        type: SHUTDOWN_FAILURE,
        error: error
    };
}

function newJvm(data) {
    return {
        type: NEW_JVM,
        data: data
    };
}

function disconnected() {
    return {
        type: DISCONNECTED
    };
}

export function connectJvmWS() {
    return dispatch => {
        var jwt = localStorage.getItem('jv_jwt');
        if (jwt) {
            var ws = new WebSocket(urlToWS('/api/jvmws') + '?jwt=' + jwt);

            ws.onmessage = function (message) {
                dispatch(newJvm(JSON.parse(message.data)));
            };

            ws.onclose = function () {
                dispatch(disconnected());
            }
        }
    }
}

export function fetchJvm() {
    return dispatch => {
        dispatch(fetchJvmRequest());

        return fetch('/api/jvm')
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
                dispatch(fetchJvmSuccess(json));
            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(fetchJvmFailure(error));
                } else {
                    response.text().then(text => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = text;
                            dispatch(fetchJvmFailure(error));
                        }
                    );
                }
            });
    };
}
