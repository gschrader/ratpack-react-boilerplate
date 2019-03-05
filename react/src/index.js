import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Login from './Login';
import Home from './Home';
import Monitor from './Monitor';

import 'bootstrap/dist/css/bootstrap.css';
import {AuthProvider} from './AuthContext'
import ProtectedRoute from "./ProtectedRoute";

import Menu from './Menu';
import {Modal} from 'react-bootstrap';
import {useWsNoData} from "./hooks";


function App() {
    const disconnected = useWsNoData('/api/status');

    return (
        <div className="container-fluid">

            <Menu/>

            <Modal show={disconnected} onHide={function () {
            }}>
                <Modal.Header>
                    <Modal.Title>Disconnected from server</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please refresh your page.
                </Modal.Body>
            </Modal>
        </div>
    );
}

const NotFound = () => (
    <div>
        <p>Page not Found.</p>
    </div>
);

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <div>
                <Route path="/" component={App}/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/login" component={Login}/>
                    <ProtectedRoute path="/monitor" component={Monitor}/>

                    <Route component={NotFound}/>
                </Switch>
            </div>
        </AuthProvider>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
