import React from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {AuthConsumer} from './AuthContext'

function Menu() {
    return (
        <AuthConsumer>
            {({isAuth, name, logout}) => (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Ratpack React Boilerplate</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            {isAuth ?
                                <LinkContainer to="/monitor">
                                    <Nav.Link>Monitor</Nav.Link>
                                </LinkContainer>
                                : React.Fragment}

                            {isAuth ?
                                <NavDropdown title={name} id="basic-nav-dropdown">
                                    <NavDropdown.Item onSelect={logout}>Log out</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <LinkContainer to="/login">
                                    <Nav.Link>Log in</Nav.Link>
                                </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            )}
        </AuthConsumer>
    );

}

export default Menu;
