import React from 'react'
import jwt_decode from 'jwt-decode';
import {checkStatus, parseJSON} from "./utils";

const AuthContext = React.createContext();

const autoLogin = () => {
    let jwt = localStorage.getItem('jv_jwt');

    if (jwt) {
        try {
            return jwt_decode(jwt);

        } catch (e) {
            console.log(e);
            localStorage.setItem('jv_jwt', '');
            return {}
        }
    } else {
        return {}
    }
};

const user = autoLogin();

class AuthProvider extends React.Component {
    state = {
        isAuth: user.name != null,
        message: '',
        user: user
    };

    login = (user, password) => {
        const that = this;
        fetch('/api/login', {
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
                localStorage.setItem('jv_jwt', json);
                let data = jwt_decode(json);
                this.setState({isAuth: true, user: data, message: ''});
            })
            .catch(function (error) {
                const response = error.response;
                response.text().then(text => {
                    that.setState({isAuth: false, user: {}, message: text});
                });
            });
    };

    logout = () => {
        this.setState({isAuth: false, user: {}});
        localStorage.setItem('jv_jwt', '');

    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isAuth: this.state.isAuth,
                    login: this.login,
                    logout: this.logout,
                    message: this.state.message,
                    name: this.state.user.name
                }}
            >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer}
