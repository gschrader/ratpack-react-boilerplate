import React, { Component } from 'react';
import {Panel, Well} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

export default
class App extends Component {
    render() {
        return (
            <Panel>
                <Well>Hello, world.</Well>
            </Panel>
        );
    }
}
