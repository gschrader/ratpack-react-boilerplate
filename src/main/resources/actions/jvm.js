import {checkStatus, parseJSON, urlToWS, getHeaders} from './utils';

export const FETCH_JVM_REQUEST = 'FETCH_JVM_REQUEST';
export const FETCH_JVM_SUCCESS = 'FETCH_JVM_SUCCESS';
export const FETCH_JVM_FAILURE = 'FETCH_JVM_FAILURE';
export const FETCH_RUNTIME_REQUEST = 'FETCH_RUNTIME_REQUEST';
export const FETCH_RUNTIME_SUCCESS = 'FETCH_RUNTIME_SUCCESS';
export const FETCH_RUNTIME_FAILURE = 'FETCH_RUNTIME_FAILURE';
export const NEW_JVM = 'NEW_JVM';
export const FORCE_GC_REQUEST = 'FORCE_GC_REQUEST';
export const FORCE_GC_SUCCESS = 'FORCE_GC_SUCCESS';
export const FORCE_GC_FAILURE = 'FORCE_GC_FAILURE';
export const SHUTDOWN_REQUEST = 'SHUTDOWN_REQUEST';
export const SHUTDOWN_SUCCESS = 'SHUTDOWN_SUCCESS';
export const SHUTDOWN_FAILURE = 'SHUTDOWN_FAILURE';
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
        var ws = new WebSocket(urlToWS('ws/jvm'));

        ws.onmessage = function (message) {
            dispatch(newJvm(JSON.parse(message.data)));
        };

        ws.onclose = function () {
            dispatch(disconnected());
        }
    }
}

export function fetchJvm() {
    return dispatch => {
        dispatch(fetchJvmRequest());

        return fetch('/jvm')
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

export function fetchRuntime() {
    return dispatch => {
        dispatch(fetchRuntimeRequest());

        return fetch('/monitor/runtime')
            .then(checkStatus)
            .then(parseJSON)
            .then(json => {
                dispatch(fetchRuntimeSuccess(json));
            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(fetchRuntimeFailure(error));
                } else {
                    response.text().then(text => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = text;
                            dispatch(fetchRuntimeFailure(error));
                        }
                    );
                }
            });
    };
}

export function forceGC() {
    return (dispatch, getState) => {
        dispatch(forceGCRequest());

        return fetch('/monitor/action/forcegc', {
            headers: getHeaders(getState)
        })
            .then(checkStatus)
            .then(function (response) {
                return response.text()
            })
            .then(text => {
                dispatch(forceGCSuccess(text));
            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(forceGCFailure(error));
                } else {
                    response.text().then(text => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = text;
                            dispatch(forceGCFailure(error));
                        }
                    );
                }
            });
    };
}

export function shutdown() {
    return (dispatch, getState) => {
        dispatch(shutdownRequest());

        return fetch('/monitor/action/shutdown', {
            headers: getHeaders(getState)
        })
            .then(checkStatus)
            .then(function (response) {
                return response.text()
            })
            .then(text => {
                dispatch(shutdownSuccess(text));
            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(shutdownFailure(error));
                } else {
                    response.text().then(text => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = text;
                            dispatch(shutdownFailure(error));
                        }
                    );
                }
            });
    };
}

