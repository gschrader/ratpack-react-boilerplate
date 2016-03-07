import 'isomorphic-fetch';
import {checkStatus, parseJSON} from './utils';
import jwt_decode from 'jwt-decode';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const AUTO_LOGIN_REQUEST = 'AUTO_LOGIN_REQUEST';

function loginRequest(user) {
    return {
        type: LOGIN_REQUEST,
        user: user
    };
}

function loginSuccess(user, name) {
    return {
        type: LOGIN_SUCCESS,
        user: user,
        name: name
    };
}

function loginFailure(user, error) {
    return {
        type: LOGIN_FAILURE,
        user: user,
        error: error
    };
}

export function login(user, password) {
    return dispatch => {
        dispatch(loginRequest(user));

        return fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                password: password
            })
        }).then(checkStatus)
            .then(parseJSON)
            .then(json => {
                console.log(json);
                localStorage.setItem('jv_jwt', json);
                var data = jwt_decode(json);
                console.log(data);
                dispatch(loginSuccess(data['private.user'], data['private.name']));
                //dispatch(loginSuccess(json.user, json.user));

            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(loginFailure(user, error));
                } else {
                    response.text()
                        .then(text => {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = text;
                            dispatch(loginFailure(user, error));
                        });
                }
            });
    };
}

function logoutRequest(user) {
    return {
        type: LOGOUT_REQUEST,
        user
    };
}

function logoutSuccess(user) {
    return {
        type: LOGOUT_SUCCESS,
        user
    };
}

function logoutFailure(user, error) {
    return {
        type: LOGOUT_FAILURE,
        user,
        error
    };
}

export function logout(user) {
    return dispatch => {
        dispatch(logoutRequest(user));

        return fetch('/api/logout', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user
            })
        }).then(checkStatus)
            .then(parseJSON)
            .then(json => {
                localStorage.setItem('jv_jwt', '');
                dispatch(logoutSuccess(user, json))
            })
            .catch(function (error) {
                const response = error.response;
                if (response === undefined) {
                    dispatch(logoutFailure(user, error));
                } else {
                    response.json()
                        .then(function (json) {
                            error.status = response.status;
                            error.statusText = response.statusText;
                            error.message = json.message;
                            dispatch(logout(user, error));
                        });
                }
            });
    };
}

function autoLoginRequest() {
    return {
        type: AUTO_LOGIN_REQUEST
    };
}

export function autoLogin() {
    return dispatch => {
        dispatch(autoLoginRequest());
        var jwt = localStorage.getItem('jv_jwt');

        if (jwt) {
            try {
                var data = jwt_decode(jwt);
                dispatch(loginSuccess(data['private.user'], data['private.name']));
            } catch (e) {
                console.log(e);
                localStorage.setItem('jv_jwt', '');
            }
        }

    };
}