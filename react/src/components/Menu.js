import React, {Component} from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {LinkContainer} from 'react-router-bootstrap';

export default class Header extends Component {
    render() {
        const {name} = this.props;
        const pathname = this.props.location.pathname;
        const isLoginPage = pathname.indexOf('login') > -1;

        return (
            !isLoginPage &&
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Ratpack React Boilerplate</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/monitor">
                            <Nav.Link>Monitor</Nav.Link>
                        </LinkContainer>

                        {name ?
                        <NavDropdown title={name} id="basic-nav-dropdown">
                            <NavDropdown.Item onSelect={this.props.handleLogout}>Log out</NavDropdown.Item>
                        </NavDropdown>
                            :
                            <LinkContainer to="/login">
                                <Nav.Link>Log in</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

Header.propTypes = {
    name: PropTypes.string,
    handleLogout: PropTypes.func.isRequired
};

Header.contextTypes = {
    location: PropTypes.object
};
