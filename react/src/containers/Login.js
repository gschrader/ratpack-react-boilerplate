import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import {Modal, Button, FormControl, FormGroup, Alert} from 'react-bootstrap';
import ReactDOM from 'react-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.context.router.replace('/');
        }
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
        const {loginError} = this.props;
        return (
            <div>
                foo
                <Modal show={true} onHide={this.handleLogin}>
                    <Modal.Header>
                        <Modal.Title>Welcome</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        {loginError
                            ? <Alert bsStyle='warning'>
                                    {loginError.message}
                                </Alert>
                            : <div/>}

                        <form>
                            <FormGroup>
                                <FormControl id="username" ref="username" type="text" label="Username" placeholder="Username"/>
                                <FormControl id="password" ref="password" label="Password" type="password" placeholder="password"/>
                            </FormGroup>
                        </form>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle='primary' onClick={this.handleLogin}>Sign in</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired,
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
