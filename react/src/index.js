import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router';
import {BrowserRouter, Redirect} from 'react-router-dom';

import configureStore from './store/configureStore';

import App from './containers/App';
import Login from './containers/Login';
import Home from './containers/Home';
import Monitor from './containers/Monitor';
import NotFound from './containers/NotFound';

import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        props.user !== null
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
    )}/>
)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/" component={App}/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path="/login" component={Login}/>
                    <PrivateRoute path='/monitor' component={Monitor} user={store.user}/>

                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
