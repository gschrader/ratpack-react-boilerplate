import React, {Component} from 'react';
import {Jumbotron, Card} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default class Home extends Component {
    state = {
        readme: ""
    };

    loadReadme() {
       fetch("readme")
             .then(response => response.text())
             .then(text =>
                 this.setState({
                 readme: text
             }));
       }

     componentDidMount() {
       this.loadReadme();
     }

     render() {
        return (
            <div className="container">
                <Jumbotron>
                    <h1>Ratpack React Boilerplate</h1>

                    <p>
                        The minimal dev environment to enable live-editing React components from a Ratpack
                        server </p>

                </Jumbotron>

                <Card>
                    <ReactMarkdown source={this.state.readme} />
                </Card>
            </div>
        );
    }
}
