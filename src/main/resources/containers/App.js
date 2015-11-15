import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Menu from '../components/Menu';

import {logout, autoLogin} from '../actions/auth';
import {connectJvmWS} from '../actions/jvm';
import {Modal} from 'react-bootstrap';

import Icon from 'react-fa';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(autoLogin());
        this.props.dispatch(connectJvmWS());
    }

    handleLogout() {
        const { user } = this.props;
        this.props.dispatch(logout(user));
        this.context.history.pushState(null, '/');
    }

    render() {
        const {name} = this.props;
        return (
            <div className="container-fluid">

                <Menu name={name} handleLogout={()=>this.handleLogout()}/>

                <div className="appContent">
                    {this.props.children}
                </div>

                <Modal show={this.props.disconnected} onHide={function (){}}>
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

App.propTypes = {
    user: PropTypes.string,
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired
};

App.contextTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
};

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
