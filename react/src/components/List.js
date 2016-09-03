import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

export class Item extends Component {
    render() {
        return (
            <Row>
                <Col md={4}>
                    <strong>{this.props.label}</strong>
                </Col>
                <Col md={8}>
                    {this.props.value}
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}

export class PropertyList extends Component {
    static createName(name) {
        var convertedString = [];

        var isUpperCase = function (char) {
            return !!/[A-Z]/.exec(char[0]);
        };

        var isLowerCase = function (char) {
            return !!/[a-z]/.exec(char[0]);
        };

        var isDigit = function (char) {
            return !!/[0-9]/.exec(char[0]);
        };

        if (name.length >= 1) {
            convertedString.push(name[0].toUpperCase());

            for (var i = 1; i < name.length; i++) {
                var c = name[i];

                if (isUpperCase(c) && (isDigit(name[i - 1]) || isLowerCase(name[i - 1]) || (isUpperCase(name[i - 1]) && i !== (name.length - 1) && isLowerCase(name[i + 1])))) {
                    convertedString.push(' ');
                }
                convertedString.push(c);
            }
        }
        return convertedString.join('');
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
PropertyList.propTypes = {object: React.PropTypes.object};
PropertyList.defaultProps = {object: {}};


export default PropertyList