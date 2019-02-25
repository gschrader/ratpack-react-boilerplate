import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from '../components/Menu';

import {autoLogin, logout} from '../actions/auth';
import {connectJvmWS} from '../actions/jvm';
import {Modal} from 'react-bootstrap';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(autoLogin());
        this.props.dispatch(connectJvmWS());
    }

    handleLogout() {
        const {user} = this.props;
        this.props.dispatch(logout(user));
    }

    render() {
        const {name} = this.props;
        return (
            <div className="container-fluid">

                <Menu location={this.props.location} name={name} handleLogout={() => this.handleLogout()}/>

                <Modal show={this.props.disconnected} onHide={function () {
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
}

function mapStateToProps(state) {
    const {auth} = state;
    const {jvm} = state;
    return {
        name: auth ? auth.name : null,
        disconnected: jvm ? jvm.disconnected : false
    };
}

export default connect(
    mapStateToProps
)(App);
