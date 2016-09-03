import React, {Component} from 'react';
import {Jumbotron, Panel} from 'react-bootstrap';

export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <Jumbotron>
                    <h1>Ratpack React Boilerplate</h1>

                    <p>
                        The minimal dev environment to enable live-editing React components from a Ratpack
                        server </p>

                </Jumbotron>

                <Panel header="Java Libraries">
                    <ul>
                        <li><a href="https://github.com/ratpack/ratpack" target="_blank">Ratpack</a></li>
                    </ul>
                </Panel>

                <Panel header="node.js Libraries">
                    <ul>
                        <li><a href="https://github.com/facebook/react" target="_blank">React</a></li>
                        <li><a href="https://github.com/reactjs/redux" target="_blank">Redux</a></li>
                        <li><a href="https://github.com/react-bootstrap/react-bootstrap" target="_blank">React
                            Bootstrap</a></li>
                        <li><a href="https://github.com/rackt/react-router" target="_blank">React Router</a></li>
                    </ul>
                </Panel>
            </div>
        );
    }
}
