import React, {Component} from 'react';
import {login} from '../actions/auth';
import {Alert, Button, FormControl, FormGroup, Modal} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        const username = ReactDOM.findDOMNode(this.refs.username);
        const password = ReactDOM.findDOMNode(this.refs.password);
        this.props.dispatch(login(username.value, password.value));
        username.value = '';
        password.value = '';
    }

    render() {
        if (this.props.user != null ) {
            return <Redirect to={{
                pathname: '/'
            }}/>
        } else {
            const {loginError} = this.props;
            return (
                <div>
                    <Modal show={true} onHide={this.handleLogin}>
                        <Modal.Header>
                            <Modal.Title>Welcome</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {loginError
                                ? <Alert variant='warning'>
                                    {loginError.message}
                                </Alert>
                                : React.Fragment}

                            <form>
                                <FormGroup>
                                    <FormControl id="username" ref="username" type="text" label="Username"
                                                 placeholder="Username"/>
                                    <FormControl id="password" ref="password" label="Password" type="password"
                                                 placeholder="password"/>
                                </FormGroup>
                            </form>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleLogin}>Sign in</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }
}

Login
    .contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Login
    .propTypes = {
    user: PropTypes.string,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function

mapStateToProps(state) {
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }

    return {user: null};
}

export default connect(mapStateToProps)(Login);
