import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {Modal, Button, Input, Alert} from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.context.history.goBack();
            //this.context.history.replaceState(null, '/');
        }
    }

    handleLogin(event) {
        event.preventDefault();
        const username = this.refs.username;
        const password = this.refs.password;
        this.props.dispatch(login(username.getValue(), password.getValue()));
        username.value = '';
        password.value = '';
    }

    render() {
        const {user, loginError} = this.props;
        return (
            <Modal show={true} onHide={this.handleLogin}>
                <Modal.Header>
                    <Modal.Title>Welcome</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {loginError ?
                        <Alert bsStyle='warning'>
                            {loginError.message}
                        </Alert> : <div/>}

                    <form>
                        <Input type="text" className="form-control" name='username' id='username'
                               spellCheck="false" autoCapitalize="off"
                               ref="username"
                               autoFocus
                               autoComplete="off" autoCorrect="off" placeholder="Username">
                        </Input>

                        <Input type="password" name='password' id="password"
                               ref="password"
                               className="form-control"
                               placeholder="Password"
                               required>
                        </Input>
                    </form>

                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle='primary' onClick={this.handleLogin}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

Login.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

Login.propTypes = {
    user: PropTypes.string,
    loginError: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {auth} = state;
    if (auth) {
        return {user: auth.user, loginError: auth.loginError};
    }

    return {user: null};
}

export default connect(mapStateToProps)(Login);


