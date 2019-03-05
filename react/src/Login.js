import React, { useState } from 'react';
import {Alert, Button, FormControl, FormGroup, Modal} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {AuthConsumer} from './AuthContext'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (<AuthConsumer>
        {({isAuth, message, login}) => (
            <div>
                {isAuth ? (
                    <Redirect to="/"/>
                ) : (
                    <Modal show={true}>
                        <Modal.Header>
                            <Modal.Title>Welcome</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            {message
                                ? <Alert variant='warning'>
                                    {message}
                                </Alert>
                                : React.Fragment}

                            <form>
                                <FormGroup>
                                    <FormControl id="username" type="text" label="Username"
                                                 placeholder="Username"
                                                 onChange={event => {
                                                     setUsername(event.target.value);
                                                 }}
                                                 value={username}

                                    />
                                    <FormControl id="password" label="Password" type="password"
                                                 placeholder="password"
                                                 onChange={event => {
                                                     setPassword(event.target.value);
                                                 }}
                                                 value={password}
                                    />
                                </FormGroup>
                            </form>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {login(username, password)}}>Sign in</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>

        )}
    </AuthConsumer>);
}

export default Login;
